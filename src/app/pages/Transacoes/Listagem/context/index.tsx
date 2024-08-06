import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ISaldo, ITransacao } from "../../../../shared/interfaces";
import { mountSaldos } from "../../../../shared/utils/mountSaldos";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../shared/redux/loading/actions";
import { useQueryListarTransacoes } from "../../../../shared/hooks/transacoes/useQuery/useQueryListarTransacoes";

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
  refetchTransacoes: () => void;
  toggleModalExcluir: boolean;
  setToggleModalExcluir: Dispatch<SetStateAction<boolean>>;
  saldos: ISaldo[];
}

export const ListagemContext = createContext({} as IListagemContextData);

export function ListagemProvider({ children }: IListagemContext): JSX.Element {
  const [toggleModalTransacoes, setToggleModalTransacoes] =
    useState<boolean>(false);

  const [toggleModalExcluir, setToggleModalExcluir] = useState<boolean>(false);

  const [transacao, setTransacao] = useState<ITransacao | null>(null);

  const [saldos, setSaldos] = useState<ISaldo[]>([]);

  const dispatch = useDispatch();

  const {
    data: transacoes,
    isLoading: isFetchingTransacoes,
    refetch: refetchTransacoes,
  } = useQueryListarTransacoes();

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
        refetchTransacoes,
        transacao,
        setTransacao,
        saldos,
      }}
    >
      {children}
    </ListagemContext.Provider>
  );
}
