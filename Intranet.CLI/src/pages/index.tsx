import { useContext } from "react";
import Head from "next/head";
import estilos from "@styles/estilos.module.scss";
import Header from "@components/Header";
import Noticias from "@components/Noticias";
import Comunicados from "@components/Comunicados";
import HeaderContext from "@context/HeaderContext";

export default function Home( { 
    aniversariantes,
    comunicados,
    menuEsquerdo,
    menuDireito,
    noticias
   }
   ) {
 
  // --- atualiza o contexto do cabeçalho

  const {dados, atualizarDados} = useContext(HeaderContext);

  dados.menuDireito = menuDireito
  dados.menuEsquerdo = menuEsquerdo
  dados.aniversariantes = aniversariantes

  // --- retorna a página

  return (
      <>
        <Head>
          <title>Intranet TCM - Seja Bem-vindo!</title>
        </Head>

        <Header/>

        <main className={estilos.contentContainer}>

          <div className={estilos.noticiasContainer}>
            <Noticias noticias={noticias} />
          </div>

          <div className={estilos.comunicadosContainer}>
            <Comunicados comunicados={comunicados} />
          </div>

        </main>
      </>
    );
}

  export async function getServerSideProps({ req }) {

      const userAgent = req ? req.headers['user-agent'] : navigator.userAgent

      const api_url = process.env.NEXT_PUBLIC_INTRANET_API_URL

      const resAniversariante = await fetch(api_url + "aniversario");
      //const resMenuSuperior = await fetch(api_url + "menu?cdordem=100");
      const resMenuEsquerdo = await fetch(api_url + "menu?cdordem=100");
      const resMenuDireito = await fetch(api_url + "menu?cdordem=101");

      const resComunicado = await fetch(api_url + "comunicado");
      const resNoticia = await fetch(api_url + "noticia");

      const aniversariantes = await resAniversariante.json();
      const menuSuperior = {}; //await resMenuSuperior.json();
      const menuEsquerdo = await resMenuEsquerdo.json();
      const menuDireito = await resMenuDireito.json();

      const comunicados = await resComunicado.json();
      const noticias = await resNoticia.json();

      return {
        props: {
          aniversariantes,
          comunicados, 
          menuSuperior,
          menuEsquerdo,
          menuDireito,
          noticias,
          userAgent
        },
      };
};

