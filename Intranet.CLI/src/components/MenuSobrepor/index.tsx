import estilos from "./menusobrepor.module.scss";
import Link from "next/link";
import { IMenuItem } from "@interfaces/IMenu";

type params = {
  itens: IMenuItem[];
  id: string;
};

export default function MenuSobrepor({ itens, id }: params) {
  
  return (
      <div className={estilos.menuContainer} id={id}>
          <nav className={estilos.menuNav}>
            {itens ? (
              itens.map(MontarLink)
            ) : (
              <span>Menu [{id}] não encontrado</span>
            )}
          </nav>
      </div>
  );
 
}

function MontarLink(item:IMenuItem) {

  let url = item.link.trim().toLowerCase();

  if (url.startsWith("https:") || url.startsWith("http:")) {

    return (
      <a key={item.cdMenuRodapeItem} href={url}>{item.nmMenuRodapeItem}</a>
    )
  
  } else if(url.startsWith("java")) {

    return (
      <a key={item.cdMenuRodapeItem} href="#!" onClick={() => {eval(url)}}>{item.nmMenuRodapeItem}</a>
    )

  } else {

    url = "https://portal.tcm.sp.gov.br" + (url.startsWith("/") ? "" : "/" ) + url;

    return (
      <Link key={item.cdMenuRodapeItem} href={url}>
        <a /* target="_blank" */ rel="noopener noreferrer">{item.nmMenuRodapeItem}</a>
      </Link>
    )

  }
}
