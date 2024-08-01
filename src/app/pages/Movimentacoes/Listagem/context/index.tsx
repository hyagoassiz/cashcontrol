import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQueryListarMovimentacao } from "../../../../shared/hooks/useQueryListarMovimentacao";
import { GlobalContext } from "../../../../shared/contexts";
import { IMovimentacao } from "../interfaces";
import { ISaldo } from "../../../../shared/interfaces";
import { mountSaldos } from "../../../../shared/utils/mountSaldos";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../shared/redux/loading/actions";

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
  saldos: ISaldo[];
}

export const ListagemContext = createContext({} as IListagemContextData);

export function ListagemProvider({ children }: IListagemContext): JSX.Element {
  const [toggleModalMovimentacoes, setToggleModalMovimentacoes] =
    useState<boolean>(false);

  const [toggleModalExcluir, setToggleModalExcluir] = useState<boolean>(false);

  const { usuario } = useContext(GlobalContext);

  const [movimentacao, setMovimentacao] = useState<IMovimentacao | null>(null);

  const [saldos, setSaldos] = useState<ISaldo[]>([]);

  const dispatch = useDispatch();

  const {
    data: movimentacoes,
    isLoading: isFetchingMovimentacoes,
    refetch: refecthMovimentacoes,
  } = useQueryListarMovimentacao({
    id: usuario.uid,
  });

  useEffect(() => {
    if (movimentacoes) {
      setSaldos(mountSaldos(movimentacoes));
    }
  }, [movimentacoes]);

  useEffect(() => {
    dispatch(setLoading(isFetchingMovimentacoes));
  }, [isFetchingMovimentacoes, dispatch]);

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
        saldos,
      }}
    >
      {children}
    </ListagemContext.Provider>
  );
}
