import React, { createContext, useState } from "react";
import IMenu, { IMenuItem } from "../interfaces/IMenu";

type PropsMenusContext = {
  state: IMenu[];
  setState: React.Dispatch<React.SetStateAction<IMenu[]>>;
};

type PropsMenuProvider = {
    children: React.ReactNode;
}

const valorDefault = {
  state: [{cdMenuRodape:""}],
  setState: () => {},
};

const MenusContext = createContext<PropsMenusContext>(valorDefault);

export default MenusContext;

export function MenusProvider({children}: PropsMenuProvider) {

    const [state, setState] = useState(valorDefault.state);

    return (
      <MenusContext.Provider
        value={{
          state,
          setState,
        }}
      >
        {children}
      </MenusContext.Provider>
    );
}

