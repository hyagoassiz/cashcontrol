import { ReactNode, createContext, useState } from "react";
import { IConta, IFilterData } from "../interfaces";

interface IListagemContasContextProps {
  children: ReactNode;
}

interface IListagemContasContextData {
  isOpenFilter: boolean;
  setIsOpenFilter: (setIsOpenFilter: boolean) => void;

  filterData: IFilterData;
  setFilterData: (setFilterData: IFilterData) => void;
  setTextFilter: (setTextFilter: string) => void;
  textFilter: string;
  setIsOpenSearchBar: (setIsOpenSearchBar: boolean) => void;
  isOpenSearchBar: boolean;
  ativarInativarContaData: IConta | null
  setAtivarInativarContaData: (setAtivarInativarConta: IConta) => void
}

export const ListagemContasContext = createContext(
  {} as IListagemContasContextData
);

export function ListagemContasProvider({
  children,
}: IListagemContasContextProps): JSX.Element {
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  const [filterData, setFilterData] = useState<IFilterData>({
    ativo: [true],
    tipoConta: ["Conta Corrente", "Poupança", "Investimentos", "Outros"],
  });
  const [textFilter, setTextFilter] = useState<string>("");
  const [isOpenSearchBar, setIsOpenSearchBar] = useState<boolean>(false);
  const [ativarInativarContaData, setAtivarInativarContaData] = useState<IConta | null>(null)

  return (
    <ListagemContasContext.Provider
      value={{
        isOpenFilter,
        setIsOpenFilter,
        filterData,
        setFilterData,
        setTextFilter,
        textFilter,
        isOpenSearchBar,
        setIsOpenSearchBar,
        ativarInativarContaData,
        setAtivarInativarContaData
      }}
    >
      {children}
    </ListagemContasContext.Provider>
  );
}
