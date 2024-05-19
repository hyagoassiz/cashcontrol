import { ReactNode, createContext, useState } from "react";
import {  IFilterData } from "../interfaces";

interface IListagemContasContextProps {
  children: ReactNode;
}

interface IListagemContasContextData {
  isOpenFilter: boolean;
  setIsOpenFilter: (setIsOpenFilter: boolean) => void;
  isOpenDialog: boolean;
  setIsOpenDialog: (setIsOpenDialog: boolean) => void;
  filterData: IFilterData;
  setFilterData: (setFilterData: IFilterData) => void;
  setTextFilter: (setTextFilter: string) => void;
  textFilter: string;
  setIsOpenSearchBar: (setIsOpenSearchBar: boolean) => void
  isOpenSearchBar: boolean
}

export const ListagemContasContext = createContext({} as IListagemContasContextData);

export function ListagemContasProvider({ children }: IListagemContasContextProps): JSX.Element {
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<IFilterData>({
    ativo: [true]
  });
  const [textFilter, setTextFilter] = useState<string>("");
  const [isOpenSearchBar, setIsOpenSearchBar] = useState<boolean>(false)


  return (
    <ListagemContasContext.Provider
      value={{
        isOpenFilter,
        setIsOpenFilter,
        isOpenDialog,
        setIsOpenDialog,
        filterData,
        setFilterData,
        setTextFilter,
        textFilter,
        isOpenSearchBar,
        setIsOpenSearchBar,
      }}
    >
      {children}
    </ListagemContasContext.Provider>
  );
}
