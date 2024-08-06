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
  toggleModalAjusteSaldo: boolean;
  setToggleMOdalAjusteSaldo: Dispatch<SetStateAction<boolean>>;
  saldos: ISaldo[];
  movimentacoes: ITransacao[] | undefined;
  isFetchingMovimentacoes: boolean;
}

export const ListagemContext = createContext({} as IListagemContextData);

export function ListagemProvider({ children }: IListagemContext): JSX.Element {
  const [toggleModalAjusteSaldo, setToggleMOdalAjusteSaldo] =
    useState<boolean>(false);

  const [saldos, setSaldos] = useState<ISaldo[]>([]);

  const dispatch = useDispatch();

  const { data: movimentacoes, isLoading: isFetchingMovimentacoes } =
    useQueryListarTransacoes();

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
        toggleModalAjusteSaldo,
        setToggleMOdalAjusteSaldo,
        saldos,
        movimentacoes,
        isFetchingMovimentacoes,
      }}
    >
      {children}
    </ListagemContext.Provider>
  );
}
