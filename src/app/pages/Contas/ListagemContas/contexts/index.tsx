import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IConta, IFilterData } from "../interfaces";
import { useQuery } from "@tanstack/react-query";
import { obterContasPorUsuario } from "../services/endpoints";
import { GlobalContext } from "../../../../shared/contexts";

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
  refetch: () => void;
  isOpenDialog: boolean;
  setIsOpenDialog: Dispatch<SetStateAction<boolean>>;
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
  const [toggleModalConta, setToggleModalConta] = useState<boolean>(false);
  const [conta, setConta] = useState<IConta | undefined>(undefined);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const { usuario } = useContext(GlobalContext);

  const {
    data: contas,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contas"],
    queryFn: () => obterContasPorUsuario(usuario.uid, filterData),
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
        refetch,
        conta,
        setConta,
        isOpenDialog,
        setIsOpenDialog,
      }}
    >
      {children}
    </ListagemContasContext.Provider>
  );
}
