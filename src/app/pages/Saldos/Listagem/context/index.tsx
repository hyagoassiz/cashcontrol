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
import { IMovimentacao, ISaldo } from "../../../../shared/interfaces";
import { mountSaldos } from "../../../../shared/utils/mountSaldos";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../shared/redux/loading/actions";

interface IListagemContext {
  children: ReactNode;
}

interface IListagemContextData {
  toggleModalAjusteSaldo: boolean;
  setToggleMOdalAjusteSaldo: Dispatch<SetStateAction<boolean>>;
  saldos: ISaldo[];
  movimentacoes: IMovimentacao[] | undefined;
  isFetchingMovimentacoes: boolean;
}

export const ListagemContext = createContext({} as IListagemContextData);

export function ListagemProvider({ children }: IListagemContext): JSX.Element {
  const { usuario } = useContext(GlobalContext);
  const [toggleModalAjusteSaldo, setToggleMOdalAjusteSaldo] =
    useState<boolean>(false);

  const [saldos, setSaldos] = useState<ISaldo[]>([]);

  const dispatch = useDispatch();

  const { data: movimentacoes, isLoading: isFetchingMovimentacoes } =
    useQueryListarMovimentacao({
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
