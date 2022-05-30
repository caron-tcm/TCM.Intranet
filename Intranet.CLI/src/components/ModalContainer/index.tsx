import { prependOnceListener } from 'process';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import estilos from "./modalcontainer.module.scss";
import { FiX } from "react-icons/fi";

interface MCParams {
  containerId: string;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  children: JSX.Element;
  cabecalho?: any;
  rodape?: any
}

export default function ModalContainer({
   containerId,
   setOpen,
   cabecalho,
   rodape,
   children}: MCParams) {

  return ReactDOM.createPortal(
    <>
      <div className={estilos.sombreado} onClick={() => setOpen(false)} />
      <div className={estilos.outerFrame}>
        <div className={estilos.innerFrame}>
            <button title="Fechar" className={estilos.botaoFechar} onClick={() => setOpen(false)}>
              <FiX  className={estilos.iconeFechar} />
            </button>
            <div className={estilos.cabecalho}>
              {cabecalho}
            </div>
            <div className={estilos.conteudo}>
              {children}
            </div>
            <div className={estilos.rodape}>
              {rodape}
            </div>
        </div>
      </div>
    </>,
    document.getElementById(containerId),
  );
}

/*


export function ModalExample(props) {

    const [open, setOpen] = useState(false);
    const [data, setData] = useState({ clicks: 0 });

    return (
    <div>
      <div>Clicks: {data.clicks}</div>
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        OPEN MODAL
      </button>
      {open && (
        <ModalContainer
          {...props}
          containerId='modalContainer'
          setOpen={setOpen}

          >
            <div>
              <h1>Olé olá</h1>
            <button />
            </div>
        </ModalContainer>
      )}
    </div>
  );
}
*/