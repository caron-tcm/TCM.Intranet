import { getSession } from "next-auth/react";
import Head from "next/head";
import Header from "@components/Header";
import estilos from "@styles/estilos.module.scss";
import { format } from "date-fns";

const docs_URL = process.env.NEXT_PUBLIC_INTRANET_DOCS_URL

export default function Noticia(props) {

  const { noticia } = props;

  return (
    <>
      <Head>
        <title>Intranet TCM - Seja Bem-vindo!</title>
      </Head>

      <Header />

      <main className={estilos.contentContainer}>


        <article className={estilos.artigo} key={noticia.idNoticia}>

            <header>

              <h2>{noticia.tituloNoticia}</h2>

                {noticia.idImagemCapa && (
                    <img
                    src={docs_URL + noticia.idImagemCapa}
                    alt={noticia.dsLegendaImagem}
                    ></img>
                )}

            </header>

            <div
                className={estilos.lead}
                dangerouslySetInnerHTML={{ __html: noticia.leadNoticia }}
            ></div>

            <div
                className={estilos.lead}
                dangerouslySetInnerHTML={{ __html: noticia.corpoNoticia}}
            ></div>

            <footer>
                Publicado em {format(new Date(noticia.dataPublicacao), "dd-MM-yyyy")}
            </footer>

        </article>

      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {

  const { id } = params;
  
  const api_url = process.env.NEXT_PUBLIC_INTRANET_API_URL

  //const session = await getSession({ req });

  const resNoticia = await fetch(api_url + "comunicado/get/" + id);

  const noticia = await resNoticia.json();

  return {
    props: { noticia },
  };
}
