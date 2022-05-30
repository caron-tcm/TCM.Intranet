import React, { createContext, useState } from "react";
import IAniversariante from "../interfaces/IAniversariante";
import IMenu from "../interfaces/IMenu";
import IUsuario from "../interfaces/IUsuario";

/*--- HeaderContext -----------------------------------------------*/

type HeaderType ={
  menuDireito?: IMenu;
  menuEsquerdo?: IMenu;
  aniversariantes?: IAniversariante[];
  usuario?: IUsuario
}

type HeaderContextType = {
  dados: HeaderType;
  atualizarDados: React.Dispatch<React.SetStateAction<HeaderType>>;
};

const defaults: HeaderType = {
    menuDireito: null,
    menuEsquerdo: null,
    aniversariantes: null,
    usuario: null
}

const HeaderContext = createContext<HeaderContextType>({ 
  dados: defaults,
  atualizarDados: () => {}
});

export default HeaderContext;

/*--- HeaderProvider -----------------------------------------------*/

type Props = {
    children: React.ReactNode;
}

export function HeaderProvider({children}: Props) {

    const [dados, atualizarDados] = useState(defaults);

    return (
      <HeaderContext.Provider value={ {dados, atualizarDados} } >
        {children}
      </HeaderContext.Provider>
    );
}

