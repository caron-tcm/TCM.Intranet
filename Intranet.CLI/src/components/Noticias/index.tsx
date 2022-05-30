import React, { useState } from 'react';
import Link from "next/link";
import estilos from './noticias.module.scss';
import INoticia from '@interfaces/INoticia';
import InfiniteScroll from "react-infinite-scroll-component";
import { format } from 'date-fns';

type params = {
    noticias: INoticia[];
};

const docs_URL = process.env.NEXT_PUBLIC_INTRANET_DOCS_URL
const api_URL = process.env.NEXT_PUBLIC_INTRANET_API_URL
const paginas_URL = "/pagina/"; //process.env.NEXT_PUBLIC_PORTAL_PAGINA_URL

export default function Noticias({ noticias }: params) {

    const [elementos, setElementos] = useState(noticias);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreData = async () => {

        if (elementos.length >= 500) {
          setHasMore(false);
          return;
        }

        let ultimoID = elementos[elementos.length - 1].idNoticia
        let buffer: INoticia[]

        do {

            let respAPI = await fetch(api_URL + `Noticia?idInicial=${ultimoID}`);
            let itens: INoticia[] = await respAPI.json()

            ultimoID = 0

             if (itens.length > 0)  {

                let ids: number[]

                if (buffer) {

                    ids = [...elementos.map( o => o.idNoticia), ...buffer.map( o => o.idNoticia) ]
                    buffer = [...buffer, ...itens.filter( o => {return ids.indexOf(o.idNoticia) == -1})]
    
                } else {

                    ids = elementos.map( o => o.idNoticia) 
                    buffer = itens.filter( o => {return ids.indexOf(o.idNoticia) == -1})
                }

                ultimoID = buffer.length < 10 ? buffer[buffer.length-1].idNoticia : 0
            }

        } while ( ultimoID > 0 );

        if (Array.isArray(buffer) && buffer.length > 0) {

            setElementos(elementos.concat(Array.from(buffer)))

        } else {

            setHasMore(false)
            
        }

    };

    const itens = elementos.map( item => (
        <article className={estilos.artigo} key={item.idNoticia}>
            <Link href={paginas_URL + item.idNoticia}>
                <a className={estilos.titulo}>
                    <h4>{item.tituloNoticia}</h4>
                </a>
            </Link>
            {item.idImagemCapa && <img src={docs_URL + item.idImagemCapa} alt={item.dsLegendaImagem}></img>}
            <div className={estilos.lead} dangerouslySetInnerHTML={({__html: item.leadNoticia} ) }>
            </div>
            <div className={estilos.leiaMais}>
                <span>{/*item.idNoticia*/} {format(new Date(item.dataPublicacao),"dd-MM-yyyy")}</span>
                <Link href={paginas_URL + item.idNoticia}>
                    <a>Leia+</a>
                </Link>
            </div>
        </article>
    ))

    const msg_Carregando = <h4>Carregando...</h4>
    const msg_Finalizado = <p><b>Finalizado!</b></p>

    return (
        <section className={estilos.container}>
            <h3>Noticias</h3>
            <div className={estilos.itens}>
            <InfiniteScroll
                dataLength={elementos.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={msg_Carregando}
                endMessage={msg_Finalizado}
                >
                {itens}
            </InfiniteScroll>
            </div>

        </section>
    );
}
