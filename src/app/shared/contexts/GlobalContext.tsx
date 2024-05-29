import { ReactNode, createContext, useEffect, useState } from "react";
import { IUsuario } from "../interfaces";

interface IGlobalContextProps {
  children: ReactNode;
}

interface IGlobalContextData {
  usuario: IUsuario;
}

export const GlobalContext = createContext({} as IGlobalContextData);

export function GlobalContextProvider({
  children,
}: IGlobalContextProps): JSX.Element {
  const [usuario, setUsuario] = useState<IUsuario>({
    id: "",
    nome: "",
    sobrenome: "",
    email: "",
    logado: false,
  });

  const handleUser = () => {
    setUsuario({
      id: "DxARypJQGMZeb1fMT4ft4BI4S2D2",
      nome: "Hyago",
      sobrenome: "Assiz",
      email: "hyagosouza@hotmail.com",
      logado: true,
    });
  };

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        usuario,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
