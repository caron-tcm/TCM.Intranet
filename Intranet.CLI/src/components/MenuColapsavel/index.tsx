import estilos from "./menucolapsavel.module.scss";
import Link from "next/link";
import { IMenuItem } from "@interfaces/IMenu";
import { FaBars } from "react-icons/fa";

type params = {
  itens: IMenuItem[];
  id: string;
};

export default function MenuColapsavel({ itens, id }: params) {
  
function expandir() {

    let x = document.getElementById(id);

    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    } 
}

  return (
      <div className={estilos.topnav} id={id}>
          <nav className={estilos.menuNav}>
            {itens ? (
              itens.map((item) => (
                <Link key={item.cdMenuRodapeItem} href={item.link}>
                  <a>{item.nmMenuRodapeItem}</a>
                </Link>
              ))
            ) : (
              <span>Menu [{id}] não encontrado</span>
            )}
            <a href="" className={estilos.icon} onClick={() => expandir()}><FaBars /></a>
          </nav>
      </div>
  );

}
