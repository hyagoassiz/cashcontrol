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
import { ITransacao } from "../interfaces";
import { ISaldo } from "../../../../shared/interfaces";
import { mountSaldos } from "../../../../shared/utils/mountSaldos";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../shared/redux/loading/actions";

interface IListagemContext {
  children: ReactNode;
}

interface IListagemContextData {
  toggleModalTransacoes: boolean;
  setToggleModalTransacoes: Dispatch<SetStateAction<boolean>>;
  transacoes: ITransacao[] | undefined;
  transacao: ITransacao | null;
  setTransacao: Dispatch<SetStateAction<ITransacao | null>>;
  isFetchingTransacoes: boolean;
  refecthMovimentacoes: () => void;
  toggleModalExcluir: boolean;
  setToggleModalExcluir: Dispatch<SetStateAction<boolean>>;
  saldos: ISaldo[];
}

export const ListagemContext = createContext({} as IListagemContextData);

export function ListagemProvider({ children }: IListagemContext): JSX.Element {
  const [toggleModalTransacoes, setToggleModalTransacoes] =
    useState<boolean>(false);

  const [toggleModalExcluir, setToggleModalExcluir] = useState<boolean>(false);

  const { usuario } = useContext(GlobalContext);

  const [transacao, setTransacao] = useState<ITransacao | null>(null);

  const [saldos, setSaldos] = useState<ISaldo[]>([]);

  const dispatch = useDispatch();

  const {
    data: transacoes,
    isLoading: isFetchingTransacoes,
    refetch: refecthMovimentacoes,
  } = useQueryListarMovimentacao({
    id: usuario.uid,
  });

  useEffect(() => {
    if (transacoes) {
      setSaldos(mountSaldos(transacoes));
    }
  }, [transacoes]);

  useEffect(() => {
    dispatch(setLoading(isFetchingTransacoes));
  }, [isFetchingTransacoes, dispatch]);

  return (
    <ListagemContext.Provider
      value={{
        toggleModalTransacoes,
        setToggleModalTransacoes,
        toggleModalExcluir,
        setToggleModalExcluir,
        transacoes,
        isFetchingTransacoes,
        refecthMovimentacoes,
        transacao,
        setTransacao,
        saldos,
      }}
    >
      {children}
    </ListagemContext.Provider>
  );
}
