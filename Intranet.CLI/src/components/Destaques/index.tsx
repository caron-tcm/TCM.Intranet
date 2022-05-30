import React, { useState } from 'react';
import Link from "next/link";
import Carousel from 'react-material-ui-carousel';
import estilos from './destaques.module.scss';
import INoticia from '@interfaces/INoticia';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Button,
    CardActionArea,
    CardActions,
} from '@mui/material';
import { ISettingsT } from './ISettings';
import { fontSize } from '@mui/system';

type params = {
    noticias: INoticia[];
  };

 const DefaultSettingsT: ISettingsT = {
    autoPlay: true,
    animation: "fade",
    indicators: true,
    duration: 1000,
    navButtonsAlwaysVisible: true,
    navButtonsAlwaysInvisible: false,
    cycleNavigation: true,
    fullHeightHover: true,
    swipe: true
}

const docs_URL = "http://localhost:5000/api/Documento?idFile=" //process.env.INTRANET_DOCS_URL;


export default function Destaques({ noticias }: params) {

    const [settings, setSettings] = useState<ISettingsT>(DefaultSettingsT);

    const destaques = noticias.filter((x) => x.flDestaque);

    return (
        <div className={estilos.container}>
            <Link href="https://portal.tcm.sp.gov.br/Publicacoes/index/75">
                <a className={estilos.maisNoticias}>Confira + noticias</a>
            </Link>
            <Carousel
                className={estilos.carosel}
                {...settings}
                // next={(now: any, previous:any) => console.log(`Next User Callback: Now displaying child ${now}. Previously displayed child ${previous}`)}
                // prev={(now, previous) => console.log(`Prev User Callback: Now displaying child ${now}. Previously displayed child ${previous}`)}
                // onChange={(now, previous) => console.log(`OnChange User Callback: Now displaying child ${now}. Previously displayed child ${previous}`)}
                
                // navButtonsProps={{style: {backgroundColor: 'cornflowerblue', borderRadius: 0}}}
                // navButtonsWrapperProps={{style: {bottom: '0', top: 'unset', }}}
                // indicatorContainerProps={{style: {margin: "20px"}}}
                // NextIcon='next'
            >
                {
                    destaques.map((item, index) => {
                        return <Banner noticia={item} key={index} contentPosition={index} />
                    })
                }
            </Carousel>

        </div>
    );
}


interface BannerProps
{
    noticia: INoticia
    contentPosition: number
}

const Banner = (props: BannerProps) => {

    const contentPosition = props.contentPosition % 2;

    let items = [];
    
    const conteudo = (
        <Grid item xs={4} key="content">

            <CardContent className={estilos.Content}>

                <Typography className={estilos.Title}>
                    {props.noticia.tituloNoticia}
                </Typography>

            </CardContent>

        </Grid>
    )

    let card;

    if (props.noticia.idImagemCapa) card = (
        <CardMedia
            //className={estilos.Media}
            component="img"
            height="100"
            image={docs_URL + props.noticia.idImagemCapa}
            title={props.noticia.leadNoticia}>
        </CardMedia>
    )

    const innerHTM = { __html: props.noticia.corpoNoticia}

    const cardNoticia = (
        <Grid item xs={8} key="imagem">
            <Card>
                {card}
                <div dangerouslySetInnerHTML={innerHTM}></div>
            </Card>
            <Button variant="outlined" className={estilos.ViewButton}>
                    Leia +
            </Button>
        </Grid>
    )

    if (contentPosition === 0) {
        items.push(conteudo);
        items.push(cardNoticia);
    } else if (contentPosition === 1) {
        items.push(cardNoticia);
        items.push(conteudo);
    }

    return (
        <Card raised className={estilos.Banner}
        >
            <Grid container spacing={0}
                className={estilos.BannerGrid}
             >
                {items}
            </Grid>
        </Card>
    )
}
