import estilos from "./carrossel.module.scss";

import React from 'react';
import Carousel from 'react-material-ui-carousel'

import INoticia from "@interfaces/INoticia";

type params = {
  noticias: INoticia[];
  useragent: string
};

export default function Destaques({ noticias }: params)
{
    const destaques = noticias.filter((x) => x.flDestaque);

    return (
      <div id="carrossel" className={estilos.carrossel}>
        <Carousel>
            {destaques.map( (item, i) => (
            <div key={item.idNoticia} className={estilos.itemcarrossel}>
                <img
                  className={estilos.imagem}
                  src={`/assets/` + item.idImagemCapa}
                  alt={item.dsLegendaImagem}
                />
                <h3>Lead da notícia</h3>
                <p>{item.leadNoticia}</p>
                </div>
            ))}
        </Carousel>
        </div>
    )
}
