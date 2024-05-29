import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { ICategoria, IFilterData } from "../interfaces";

interface IListagemCategoriasContextProps {
  children: ReactNode;
}

interface IListagemCategoriasContextData {
  isOpenFilter: boolean;
  setIsOpenFilter: (setIsOpenFilter: boolean) => void;
  isOpenDialog: boolean;
  setIsOpenDialog: (setIsOpenDialog: boolean) => void;
  activateDeactivateData: ICategoria;
  setActivateDeactivateData: (setActivateDeactivateData: ICategoria) => void;
  filterData: IFilterData;
  setFilterData: (setFilterData: IFilterData) => void;
  setTextFilter: (setTextFilter: string) => void;
  textFilter: string;
  setIsOpenSearchBar: (setIsOpenSearchBar: boolean) => void;
  isOpenSearchBar: boolean;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

export const ListagemCategoriasContext = createContext(
  {} as IListagemCategoriasContextData
);

export function ListagemCategoriasProvider({
  children,
}: IListagemCategoriasContextProps): JSX.Element {
  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [activateDeactivateData, setActivateDeactivateData] =
    useState<ICategoria>({
      id: "",
      usuario: "",
      nome: "",
      tipo: null,
      ativo: true,
    });
  const [filterData, setFilterData] = useState<IFilterData>({
    tipo: ["Entrada", "Saída"],
    ativo: [true],
  });
  const [textFilter, setTextFilter] = useState<string>("");
  const [isOpenSearchBar, setIsOpenSearchBar] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  return (
    <ListagemCategoriasContext.Provider
      value={{
        isOpenFilter,
        setIsOpenFilter,
        isOpenDialog,
        setIsOpenDialog,
        activateDeactivateData,
        filterData,
        setFilterData,
        setActivateDeactivateData,
        setTextFilter,
        textFilter,
        isOpenSearchBar,
        setIsOpenSearchBar,
        reload,
        setReload,
      }}
    >
      {children}
    </ListagemCategoriasContext.Provider>
  );
}
