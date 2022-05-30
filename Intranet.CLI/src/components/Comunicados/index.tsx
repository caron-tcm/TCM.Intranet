import React, { useState } from 'react';
import Link from "next/link";
import estilos from './comunicados.module.scss';
import IComunicado from '@interfaces/IComunicado';
import InfiniteScroll from "react-infinite-scroll-component";
import { format } from 'date-fns';

type params = {
    comunicados: IComunicado[];
  };

  const docs_URL = process.env.NEXT_PUBLIC_INTRANET_DOCS_URL
  const api_URL = process.env.NEXT_PUBLIC_INTRANET_API_URL
  const paginas_URL = "/pagina/"; //process.env.NEXT_PUBLIC_PORTAL_PAGINA_URL

export default function Comunicados({ comunicados }: params) {

    const [elementos, setElementos] = useState(comunicados);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreData = async () => {

        if (elementos.length >= 500) {
          setHasMore(false);
          return;
        }

        let ultimoID = elementos[elementos.length - 1].idComunicado
        let buffer: IComunicado[]

        do {

            let respAPI = await fetch(api_URL + `Comunicado?idInicial=${ultimoID}`);
            let itens: IComunicado[] = await respAPI.json()

            ultimoID = 0

             if (itens.length > 0)  {

                let ids: number[]

                ids = elementos.map( o => o.idComunicado) 
                buffer = itens.filter( o => {return ids.indexOf(o.idComunicado) == -1})


                if (buffer) {

                    ids = [...elementos.map( o => o.idComunicado), ...buffer.map( o => o.idComunicado) ]
                    buffer = [...buffer, ...itens.filter( o => {return ids.indexOf(o.idComunicado) == -1})]
    
                } else {

                    ids = elementos.map( o => o.idComunicado) 
                    buffer = itens.filter( o => {return ids.indexOf(o.idComunicado) == -1})
                }

                ultimoID = buffer.length < 10 ? buffer[buffer.length-1].idComunicado : 0
            }

        } while ( ultimoID > 0 );

        if (Array.isArray(buffer) && buffer.length > 0) {

            setElementos(elementos.concat(Array.from(buffer)))

        } else {

            setHasMore(false)
            
        }

    };

    const itens = elementos.map( item => (
        <article className={estilos.artigo} key={item.idComunicado}>
            <Link href={paginas_URL + item.idComunicado}>
                <a className={estilos.titulo}>
                    <h4>{item.tituloComunicado}</h4>
                </a>
            </Link>
            {item.idImagemCapa && <img src={docs_URL + item.idImagemCapa} alt={item.dsLegendaImagem}></img>}
            <div className={estilos.lead} dangerouslySetInnerHTML={({__html: item.corpoComunicado} ) }>
            </div>
            <div className={estilos.leiaMais}>
                <span>{/*item.idNoticia*/} {format(new Date(item.dataPublicacao),"dd-MM-yyyy")}</span>
                <Link href={paginas_URL + item.idComunicado}>
                    <a>Leia+</a>
                </Link>
            </div>
        </article>
    )) 

    const msg_Carregando = <h4>Carregando...</h4>
    const msg_Finalizado = <p><b>Finalizado!</b></p>

    return (
<aside className={estilos.container}>
    <h3>Comunicados</h3>
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
</aside>
    );
}
