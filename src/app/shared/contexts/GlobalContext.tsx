import { ReactNode, createContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/interfaces/IRedux";
import { IUsuario } from "../interfaces";

interface IGlobalContextProps {
  children: ReactNode;
}

interface IGlobalContextData {
  usuario: IUsuario;
}

export const GlobalContext = createContext<IGlobalContextData>(
  {} as IGlobalContextData
);

export function GlobalContextProvider({
  children,
}: IGlobalContextProps): JSX.Element {
  const usuario = useSelector((state: RootState) => state.user);

  return (
    <GlobalContext.Provider value={{ usuario }}>
      {children}
    </GlobalContext.Provider>
  );
}
