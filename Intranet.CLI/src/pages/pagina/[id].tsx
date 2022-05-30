import { getSession } from "next-auth/react";
import Head from "next/head";
import Header from "../../components/Header";
//import IframeResizer from 'iframe-resizer-react';
import estilos from "./pagina.module.scss";
import Relatorio from "../../components/Relatorio";
import IRelatorio from "../../interfaces/IRelatorio";
import { SyntheticEvent } from "react";

const api_URL = process.env.NEXT_PUBLIC_INTRANET_API_URL
const docs_URL = process.env.NEXT_PUBLIC_INTRANET_DOCS_URL

export default function Pagina(props) {

  const { relatorio : relatorio } : {relatorio : IRelatorio} = props;

  const crumbs = [{href:"/",title:"Home"}]

  if (relatorio) crumbs.push({href:"/Pagina/" + relatorio.cdRelatorio, title: relatorio.dsRelatorio})
  
  return (
    <>
      <Head>
        <title>
          {relatorio ? relatorio.nmRelatorio : "Ops! - Intranet TCM"}
        </title>
      </Head>

      <Header />

      <main className={estilos.contentContainer}>
      
         {resolverContainerRelatorio(relatorio)}

      </main>
    </>  
  );
}

function iframeLoad(e : SyntheticEvent<HTMLIFrameElement, Event>) {

  console.log("ILoad ===> " + e.currentTarget.src)

  const destino = e.currentTarget.src

  console.log("=== XHR ===> init")
  var xhr = new XMLHttpRequest();

  xhr.onload = function() {
    console.log("=== XHR ===> onLoad-Ini")
    console.log(this.responseXML.title);
    console.log("=== XHR ===> onLoad-End")
  }
  xhr.open("GET", destino);
  xhr.responseType = "document";
  xhr.send();
  console.log("=== XHR ===> sent")

}

function resolverContainerRelatorio(relatorio : IRelatorio) : JSX.Element {

  let result = <div className={estilos.mensagemErroContainer}>
                  <h1 className={estilos.mensagemErro}>Desculpe! Não encontramos esse documento!</h1>
               </div>;

  if (relatorio) {
    if ( (relatorio.cdTipoRelatorio == 40 ||  relatorio.cdTipoRelatorio == 75) && relatorio.flPublico) {

      result = <article className={estilos.artigo} key={relatorio.cdRelatorio}>
                  <Relatorio item={relatorio} />
                </article>
    } else {
      
      const destino = process.env.NEXT_PUBLIC_PORTAL_PAGINA_URL + relatorio.cdRelatorio + "?showlayout=true"
      
      result = <iframe className={estilos.iframePrincipal} src={destino} /*sandbox=""*/ onLoad={e => iframeLoad(e)} />

    }
  }

  return result

}

export async function getServerSideProps({ params }) {

  let Result = null;

  const { id } = params;
  
  const api_url = process.env.NEXT_PUBLIC_INTRANET_API_URL

  const resRelatorio = await fetch(api_url + "relatorio/get/" + id);
  const relatorio : IRelatorio = resRelatorio.ok ? await resRelatorio.json() : null;
/*
  if (resRelatorio.ok) {

    if (relatorio.cdTipoRelatorio == 40 || relatorio.cdTipoRelatorio ==75) {
      
      // documentos com tipos conhecidos são apresentados normalmente

      Result = {
        props: { relatorio }
      }
    } else {
      
      // documentos com tipo não implementados são redirecionados para o Portal

      Result = {
        redirect: {
          destination: process.env.NEXT_PUBLIC_PORTAL_PAGINA_URL + id,
          permanent: false,
        },
      }
    }

  } else {
    
    // documento não encontrado: resolvemos por aqui mesmo (TODO: implementar uma página para 404)

    Result = {
      props: { relatorio }
    }

  }
*/

  Result = {
    props: { relatorio }
  }

  return Result;
}
