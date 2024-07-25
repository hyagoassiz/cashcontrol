import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useQueryListarMovimentacao } from "../../../../shared/hooks/useQueryListarMovimentacao";
import { GlobalContext } from "../../../../shared/contexts";
import { IMovimentacao } from "../interfaces";

interface IListagemContext {
  children: ReactNode;
}

interface IListagemContextData {
  toggleModalMovimentacoes: boolean;
  setToggleModalMovimentacoes: Dispatch<SetStateAction<boolean>>;
  movimentacoes: IMovimentacao[] | undefined;
  movimentacao: IMovimentacao | null;
  setMovimentacao: Dispatch<SetStateAction<IMovimentacao | null>>;
  isFetchingMovimentacoes: boolean;
  refecthMovimentacoes: () => void;
  toggleModalExcluir: boolean;
  setToggleModalExcluir: Dispatch<SetStateAction<boolean>>;
}

export const ListagemContext = createContext({} as IListagemContextData);

export function ListagemProvider({ children }: IListagemContext): JSX.Element {
  const [toggleModalMovimentacoes, setToggleModalMovimentacoes] =
    useState<boolean>(false);

  const [toggleModalExcluir, setToggleModalExcluir] = useState<boolean>(false);

  const { usuario } = useContext(GlobalContext);

  const [movimentacao, setMovimentacao] = useState<IMovimentacao | null>(null);

  const {
    data: movimentacoes,
    isLoading: isFetchingMovimentacoes,
    refetch: refecthMovimentacoes,
  } = useQueryListarMovimentacao({
    id: usuario.id,
  });

  return (
    <ListagemContext.Provider
      value={{
        toggleModalMovimentacoes,
        setToggleModalMovimentacoes,
        toggleModalExcluir,
        setToggleModalExcluir,
        movimentacoes,
        isFetchingMovimentacoes,
        refecthMovimentacoes,
        movimentacao,
        setMovimentacao,
      }}
    >
      {children}
    </ListagemContext.Provider>
  );
}
