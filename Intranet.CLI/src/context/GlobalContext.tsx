import React, { FunctionComponent } from "react";

import { MenusProvider } from "./MenusContext";

const GlobalContext: FunctionComponent = ({ children }) => {
  return (
    <>
      <MenusProvider>{children}</MenusProvider>;
    </>
  );
};

export default GlobalContext;
