import React, { ReactFragment, useState } from 'react';
import estilos from './relatorio.module.scss';
import IRelatorio from '@interfaces/IRelatorio';
import Breadcrumb from '@components/Breadcrumb';
import { BuscarTipoDeArquivo, BytesToSize, eTipoDeArquivo, FormatarData } from '../../util/Utilidades';
import IDocumento from '@interfaces/IDocumento';
import { FaRssSquare, FaTags } from "react-icons/fa";

type params = {
    item: IRelatorio;
};

const docs_URL = process.env.NEXT_PUBLIC_INTRANET_DOCS_URL
const thumbnail_URL = process.env.NEXT_PUBLIC_INTRANET_API_URL + "Documento/getThumbnail?idFile="

export default function Relatorio( { item: Model }:params ) {

    // define o caminho do bread crumb

    const crumbs = [{href:"/",title:"Home"}]

    if (Model) crumbs.push({href:"/Pagina/" + Model.cdRelatorio, title: Model.nmRelatorio})

    // separa os arquivos anexados por tipo

    let capa: IDocumento;
    let anexoImagens : IDocumento[] = [];
    let anexoDocumentos : IDocumento[] = [];
    let anexoAudios : IDocumento[] = [];
    let anexoVideos : IDocumento[] = [];

    if (Model.documentos) {

        capa = Model.documentos.find(item => item.cdRelatorioDocumento == Model.cdRelatorioDocumentoImagemCapa);
        
        Model.documentos.forEach(item => {
            switch (BuscarTipoDeArquivo(item.nmDocumento)) {
                case eTipoDeArquivo.Imagem:
                    if(item.cdRelatorioDocumento != Model.cdRelatorioDocumentoImagemCapa)
                        anexoImagens.push(item)
                    break;
                case eTipoDeArquivo.Documento:
                    anexoDocumentos.push(item)
                    break;
                case eTipoDeArquivo.Video:
                    anexoVideos.push(item)
                    break;
                case eTipoDeArquivo.Audio:
                    anexoAudios.push(item)
                    break;
                default:
                    console.log("Tipo de arquivo não identificado: " + item.nmDocumento)
                    break;
            }
        });
    }

    // retorna o resultado

    return (
        <section className={estilos.container}>

            <Breadcrumb itens={crumbs} titulo={Model.tipoRelatorio.nmTipoRelatorio}/>

            {/*--- Região 0 (título) ---------------------------------------------------*/}

            <title className={estilos.regiao0}>

                {Model.flDestaque && <img src="/Images/new.png" width="50px" title="Destaque" />}
                {Model.nmRelatorio}
                {Model.tipoRelatorio.flPermitirFeedRss &&
                <a href={"/Api/RssFeed/" + Model.tipoRelatorio.cdTipoRelatorio} target="_blank" rel="noreferrer" title={"Link para o RSS do Tribunal de Contas do Município de São Paulo - " + Model.tipoRelatorio.nmTipoRelatorio}>
                    <i aria-hidden="true"><FaRssSquare color="#F5A729"/></i>
                </a>
                }
            </title>

            {/*--- Região 1 (data) ----------------------------------------------------*/}

            <div className={estilos.regiao1}>

                <span className={estilos.dataDoRelatorio}>

                    {Model.tipoRelatorio.flExibirConsultaCampoNmResposavel && Model.nmResponsavel &&
                    <i>{Model.nmResponsavel}</i>}
                    {resolverDataAtualizacao(Model)}

                </span>

                {((Model.flPublico && (Model.tipoRelatorio.flPublico && Model.tipoRelatorio.flPermitirEditarIntranetInternet && Model.flInternet)) || (Model.tipoRelatorio.flPublico && !Model.tipoRelatorio.flPermitirEditarIntranetInternet)) &&
                <div>
                    <div className="sharethis-inline-share-buttons"></div>
                </div>
                }

                {((!Model.tipoRelatorio.flPublico || (Model.tipoRelatorio.flPermitirEditarIntranetInternet && !Model.flInternet)) && Model.tipoRelatorio.flMostrarMensagemConteudoExclusivoIntranet) &&
                <div
                    ><strong><em>Conteúdo Exclusivo Intranet</em></strong>
                </div>
                }

            </div>

            <article className={estilos.regiao2}>

                {/*--- Região 3 (imagem capa) -----------------------------------------------*/}

                {(capa &&
                    <div className={estilos.regiao3}>
                        <div className={(Model.dtDataPublicacao < new Date(2019,8,20)) ? "col-sm-6 col-xs-12 col-sm-offset-3" : "col-xs-12"}>
                            <div className={(Model.flRetirarContornoImagemCapa ? "" : estilos.cardImagem)}>
                                <a href={docs_URL + capa.idFile} target="_blank" rel="noreferrer">
                                    <img src={docs_URL + capa.idFile} alt={Model.dsLegendaImagem}/>
                                    {Model.dsLegendaImagem?.length>0 &&
                                    <p><em>{Model.dsLegendaImagem}</em></p>
                                    }
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/*--- Região 2 ---------------------------------------------------------*/}

                {Model.tipoRelatorio.flDsRelatorio &&
                    <div className={capa ? estilos.regiao2 : estilos.regiao2semCapa} dangerouslySetInnerHTML={{ __html: Model.dsRelatorio }}></div>
                }

            </article>

            {/*--- Documentos Anexados ------------------------------------------------------*/}

            {anexoDocumentos.length > 0 &&
            <div className={estilos.documentosAnexados}>
                <h3 className={estilos.topicoMenu}>
                    Documentos Anexados
                </h3>
                {anexoDocumentos.map((item) => { return ResolverAnexo(item) })}
            </div>
            }

            {anexoAudios.length > 0 &&
            <div className={estilos.documentosAnexados}>
                <h3 className={estilos.topicoMenu}>
                    Audios Anexados
                </h3>
                {anexoAudios.map((item) => { return ResolverAnexo(item) })}
            </div>
            }

            {anexoVideos.length > 0 &&
            <div className={estilos.documentosAnexados}>
                <h3 className={estilos.topicoMenu}>
                    Videos Anexados
                </h3>
                {anexoVideos.map((item) => { return ResolverAnexo(item) })}
            </div>
            }

            {/*--- Imagens anexadas ---------------------------------------------------------*/}

            {anexoImagens.length > 0 &&
            <div className={estilos.imagensAnexadas}>
                <h3 className={estilos.topicoMenu}>
                    Imagens Anexadas
                </h3>
                {anexoImagens.map(item =>
                    <div key={item.idFile} className={estilos.cardImagem}>
                        <a href={docs_URL + item.idFile} target="_blank" rel="noreferrer">
                            <figure>
                                <img src={docs_URL + item.idFile} className={estilos.imagensAnexadas} alt={item.dsDocumento} />
                                <figcaption><em>{item.dsDocumento}</em></figcaption>
                            </figure>
                        </a>
                    </div>)}
            </div>
            }

            {/*--- Tags ---------------------------------------------------------*/}

            {Model.tipoRelatorio.flPermitirTags && Model.tags.length > 0 && (
                <div className={estilos.tagsContainer}>
                    <FaTags /><strong> Tags</strong>
                    <br />
                    {Model.tags.map( item => <a href={"/Tags?tag[0]=" + item.cdTag} key={item.IdFile}><span>{item.nmTag}</span></a>)}
                </div>
            )}

        </section>
    );
}


//--------------------------------------------------------------- resolverDataAtualização

function resolverDataAtualizacao(Model: IRelatorio) {

    var dtref = null
    var dtpub = null
    var dtatu = null

    let dtFormatada = ""
    let dtSpan = " HÁ "

    if (Model.tipoRelatorio.flExibirConsultaCampoDtReferencia && Model.dtReferencia) {

        dtFormatada = FormatarData(Model.dtReferencia,"dd/MM/yyyy HH:mm")
        dtSpan += FormatarData(Model.dtReferencia,"o")

    } else {

        if (Model.tipoRelatorio.flExibirConsultaDtPublicacao && Model.dtDataPublicacao) {

            dtFormatada = FormatarData(Model.dtDataPublicacao,"dd/MM/yyyy HH:mm")
            dtSpan += FormatarData(Model.dtDataPublicacao,"o")
        }
    
        if (Model.dtDataAtualizacao) {

            dtFormatada += " ( Atualização *" + FormatarData(Model.dtDataAtualizacao,"dd/MM/yyyy HH:mm") + "* )"
        }
    
    }

    return (<i>{dtFormatada}<small><abbr title={dtFormatada}>{dtSpan}</abbr></small></i>)
}

function ResolverAnexo(props: IDocumento) : JSX.Element {
    
    let dataGallery = BuscarTipoDeArquivo(props.nmDocumento) == eTipoDeArquivo.Imagem ? { "data-gallery": "true" } : {};
    let nome = (props.dsDocumento == "") ? props.nmDocumento : props.dsDocumento;

    return (
    <a key={props.idFile} href={"javascript:window.open('" + docs_URL + props.idFile + "');void(0)"} title={nome} {...dataGallery}>
        <img width="32" height="32" src={thumbnail_URL + props.idFile} alt={nome} />
        <i>{nome}&nbsp;({BytesToSize(props.size)})</i>
    </a>
    )

}
