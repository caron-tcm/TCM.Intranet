import Link from "next/link";
import React, { useContext, useState } from "react";
import { FaHome, FaSearch, FaBirthdayCake } from "react-icons/fa";
import { MdOutlineLiveTv, MdLiveTv } from "react-icons/md";
import estilos from "./header.module.scss";
import SignInButton from "@components/SignInButton";
import MenuSobrepor from "@components/MenuSobrepor";
import ModalContainer from "@components/ModalContainer";
import AoVivo from "@components/AoVivo";
import Aniversarios from "@components/Aniversarios";
import HeaderContext from "@context/HeaderContext";

export default function Header() {

  const {dados} = useContext(HeaderContext);

  const [menuEsqVisivel, setmenuEsqVisivel] = useState(false);
  const [menuDirVisivel, setmenuDirVisivel] = useState(false);
  const [menuSupVisivel, setmenuSupVisivel] = useState(false);
  const [aoVivo, setAoVivoVisivel] = useState(false);
  const [aniverVisivel, setAniverVisivel] = useState(false);

  return (
    <>
      <header className={estilos.headerContainer}>

        <div className={estilos.headerContent}>

          <div className={estilos.logotipoContainer}>
            <Link href="/">
              <img src="/images/logoTCM.svg" alt="IntranetTCM" />
            </Link>
          </div>
          
          {/* <MenuColapsavel id="menuSuperior" itens={menuSuperior}/> */}

          <nav>

            <Link href="/">
              <a title="Home">
                <FaHome />
              </a>
            </Link>

            <a onClick={() => { setmenuEsqVisivel(true) }}>Áreas</a>
            <a onClick={() => { setmenuDirVisivel(true) }}>Úteis</a>
            <a onClick={() => { eval("javascript:window.open('https://portal.tcm.sp.gov.br/');void(0);")}}>Portal TCMSP</a>
            <a onClick={() => { eval("javascript:window.open('http://www.escoladecontas.tcm.sp.gov.br/');void(0);")}}>Portal EGC</a>
            <a onClick={() => { setAniverVisivel(true) }} title="Aniversariantes"><FaBirthdayCake /></a>
            
            <Link href="/consultas">
              <a  title="Pesquisar">
                <FaSearch />
              </a>
            </Link>
            
            <a title="Ao vivo">
              <MdLiveTv size="20" color="white" onClick={() => setAoVivoVisivel(true)} />
            </a>

          </nav>

          <SignInButton />

        </div>
      </header>

      {menuEsqVisivel && (
        <ModalContainer
          containerId="modalContainer"
          setOpen={setmenuEsqVisivel}
        >
          <MenuSobrepor itens={dados.menuEsquerdo.subItens} id="menuEsquerdo" />
        </ModalContainer>
      )}

      {menuDirVisivel && (
        <ModalContainer
          containerId="modalContainer"
          setOpen={setmenuDirVisivel}
        >
          <MenuSobrepor itens={dados.menuDireito.subItens} id="menuDireito" />
        </ModalContainer>
      )}
 
      {aoVivo && (
        <ModalContainer
          containerId="modalContainer"
          setOpen={setAoVivoVisivel}
        >
          <AoVivo id="aoVivo" src="https://www.youtube.com/embed/ljJLa43x7lk?start=1507" />
        </ModalContainer>
      )}

      {aniverVisivel && (
        <ModalContainer
          containerId="modalContainer"
          setOpen={setAniverVisivel}
        >
          <Aniversarios aniversarios={dados.aniversariantes} />
        </ModalContainer>
      )}
    </>
  );
}
