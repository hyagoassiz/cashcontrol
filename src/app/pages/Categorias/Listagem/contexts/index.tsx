import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IFilterData } from "../interfaces";
import { obterCategoriasPorUsuario } from "../services/endpoints";
import { useQuery } from "@tanstack/react-query";
import { ICategoria } from "../../../../shared/interfaces";
import { GlobalContext } from "../../../../shared/contexts";

interface IListagemCategoriasContextProps {
  children: ReactNode;
}

interface IListagemCategoriasContextData {
  toggleFilter: boolean;
  setToggleFilter: Dispatch<SetStateAction<boolean>>;
  toggleModalSituacao: boolean;
  setToggleModalSituacao: Dispatch<SetStateAction<boolean>>;
  filterData: IFilterData;
  setFilterData: (setFilterData: IFilterData) => void;
  setTextFilter: Dispatch<SetStateAction<string>>;
  textFilter: string;
  setToggleSearchBar: Dispatch<SetStateAction<boolean>>;
  toggleSearchBar: boolean;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
  categorias: ICategoria[] | undefined;
  categoria: ICategoria | undefined;
  setCategoria: Dispatch<SetStateAction<ICategoria | undefined>>;
  isLoading: boolean;
  refetch: () => void;
  toggleModalCategoria: boolean;
  setToggleModalCategoria: Dispatch<SetStateAction<boolean>>;
}

export const ListagemCategoriasContext = createContext(
  {} as IListagemCategoriasContextData
);

export function ListagemCategoriasProvider({
  children,
}: IListagemCategoriasContextProps): JSX.Element {
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);
  const [toggleModalSituacao, setToggleModalSituacao] =
    useState<boolean>(false);
  const [filterData, setFilterData] = useState<IFilterData>({
    tipo: ["Entrada", "Saída"],
    ativo: [true],
  });
  const [textFilter, setTextFilter] = useState<string>("");
  const [toggleSearchBar, setToggleSearchBar] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [categoria, setCategoria] = useState<ICategoria | undefined>(undefined);
  const [toggleModalCategoria, setToggleModalCategoria] =
    useState<boolean>(false);
  const { usuario } = useContext(GlobalContext);

  const {
    data: categorias,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categorias"],
    queryFn: () => obterCategoriasPorUsuario(usuario.uid, filterData),
  });

  useEffect(() => {
    refetch();
  }, [filterData]);

  return (
    <ListagemCategoriasContext.Provider
      value={{
        toggleFilter,
        setToggleFilter,
        toggleModalSituacao,
        setToggleModalSituacao,
        filterData,
        setFilterData,
        setTextFilter,
        textFilter,
        toggleSearchBar,
        setToggleSearchBar,
        reload,
        setReload,
        categorias,
        categoria,
        setCategoria,
        isLoading,
        refetch,
        toggleModalCategoria,
        setToggleModalCategoria,
      }}
    >
      {children}
    </ListagemCategoriasContext.Provider>
  );
}
