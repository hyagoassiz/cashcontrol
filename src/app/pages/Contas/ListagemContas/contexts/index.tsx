import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { IConta, IFilterData } from "../interfaces";
import { useQuery } from "@tanstack/react-query";
import { obterContasPorUsuario } from "../services/endpoints";

interface IListagemContasContext {
  children: ReactNode;
}

interface IListagemContasContextData {
  toggleFilter: boolean;
  setToggleFilter: Dispatch<boolean>;
  isLoading: boolean;
  contas: IConta[] | undefined;
  setConta: Dispatch<IConta | undefined>;
  conta: IConta | undefined;
  filterData: IFilterData;
  setFilterData: Dispatch<IFilterData>;
  setTextFilter: (setTextFilter: string) => void;
  textFilter: string;
  setToggleSearchBar: Dispatch<boolean>;
  toggleSearchBar: boolean;
  setToggleModalConta: Dispatch<SetStateAction<boolean>>;
  toggleModalConta: boolean;
  ativarInativarContaData: IConta | null;
  setAtivarInativarContaData: (setAtivarInativarConta: IConta) => void;
  refetch: () => void;
}

export const ListagemContasContext = createContext(
  {} as IListagemContasContextData
);

export function ListagemContasProvider({
  children,
}: IListagemContasContext): JSX.Element {
  const [toggleFilter, setToggleFilter] = useState<boolean>(false);

  const [filterData, setFilterData] = useState<IFilterData>({
    ativo: [true],
    tipoConta: ["Conta Corrente", "Poupança", "Investimentos", "Outros"],
  });
  const [textFilter, setTextFilter] = useState<string>("");
  const [toggleSearchBar, setToggleSearchBar] = useState<boolean>(false);
  const [ativarInativarContaData, setAtivarInativarContaData] =
    useState<IConta | null>(null);
  const [toggleModalConta, setToggleModalConta] = useState<boolean>(false);
  const [conta, setConta] = useState<IConta | undefined>(undefined);

  const {
    data: contas,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contas"],
    queryFn: () =>
      obterContasPorUsuario("DxARypJQGMZeb1fMT4ft4BI4S2D2", filterData),
  });

  useEffect(() => {
    refetch();
  }, [filterData]);

  return (
    <ListagemContasContext.Provider
      value={{
        toggleFilter,
        setToggleFilter,
        isLoading,
        contas,
        filterData,
        setFilterData,
        setTextFilter,
        textFilter,
        toggleSearchBar,
        setToggleSearchBar,
        toggleModalConta,
        setToggleModalConta,
        ativarInativarContaData,
        setAtivarInativarContaData,
        refetch,
        conta,
        setConta,
      }}
    >
      {children}
    </ListagemContasContext.Provider>
  );
}
