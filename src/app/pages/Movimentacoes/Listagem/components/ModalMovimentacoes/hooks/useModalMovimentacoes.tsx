import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ListagemContext } from "../../../context";
import {
  Control,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { IMovimentacao } from "../../../interfaces";
import { getTodayDate } from "../../../../../../shared/utils/getTodayDate";
import { useQueryListarCategoria } from "../../../../../../shared/hooks/useQueryListarCategoria";
import { ICategoria, IConta } from "../../../../../../shared/interfaces";
import { GlobalContext } from "../../../../../../shared/contexts";
import { useQueryListarConta } from "../../../../../../shared/hooks/useQueryListarConta";
import { useMutationAdicionarMovimentacao } from "../../../../../../shared/hooks/useMutationAdicionarMovimentacao";
import { useMutationEditarMovimentacao } from "../../../../../../shared/hooks/useMutationEditarMovimentacao";
import { getSaldo } from "../../../../../../shared/utils/getSaldo";

interface ISaldoConta {
  saldo: number;
  valorDigitado: number;
  novoSaldo: number;
}
interface IUseModalMovimentacoes {
  toggleModalMovimentacoes: boolean;
  handleModalMovimentacoes: () => void;
  control: Control<IMovimentacao>;
  categorias: ICategoria[] | undefined;
  isFetchingCategorias: boolean;
  contas: IConta[] | undefined;
  isFetchingContas: boolean;
  handleSubmit: UseFormHandleSubmit<IMovimentacao>;
  onSubmit: () => void;
  tipos: string[];
  getValues: UseFormGetValues<IMovimentacao>;
  watch: UseFormWatch<IMovimentacao>;
  setValue: UseFormSetValue<IMovimentacao>;
  saldoConta: ISaldoConta;
  setValorOriginal: Dispatch<SetStateAction<number>>;
}

export const useModalMovimentacoes = (): IUseModalMovimentacoes => {
  const {
    toggleModalMovimentacoes,
    setToggleModalMovimentacoes,
    refecthMovimentacoes,
    movimentacao,
    setMovimentacao,
    saldos,
  } = useContext(ListagemContext);

  const { usuario } = useContext(GlobalContext);

  const { control, handleSubmit, setValue, reset, getValues, watch } =
    useForm<IMovimentacao>({
      defaultValues: {
        data: getTodayDate(),
        pago: true,
      },
    });

  const { data: categorias, isLoading: isFetchingCategorias } =
    useQueryListarCategoria({ id: usuario.id });

  const { data: contas, isLoading: isFetchingContas } = useQueryListarConta({
    id: usuario.id,
  });

  const tipos = ["Entrada", "Saída"];

  const [saldoConta, setSaldoConta] = useState<ISaldoConta>({
    saldo: 0,
    valorDigitado: 0,
    novoSaldo: 0,
  });

  const [valorOriginal, setValorOriginal] = useState<number>(0);

  useEffect(() => {
    const conta = getValues("conta");
    const valor = getValues("valor");
    const tipo = getValues("tipo");
    const pago = getValues("pago");
    const saldoAtual = getSaldo(conta, saldos);

    const calcularNovoSaldo = () => {
      if (pago) {
        if (tipo === "Entrada") {
          return valor >= valorOriginal
            ? saldoAtual + valor
            : saldoAtual - valorOriginal + valor;
        } else {
          return valor >= valorOriginal
            ? saldoAtual + valorOriginal - valor
            : saldoAtual + valorOriginal - valor;
        }
      } else {
        return tipo === "Entrada" ? saldoAtual : saldoAtual + valorOriginal;
      }
    };

    setSaldoConta({
      saldo: saldoAtual,
      valorDigitado: valor,
      novoSaldo: calcularNovoSaldo(),
    });
  }, [watch("valor"), watch("conta"), watch("pago"), watch("tipo")]);

  useEffect(() => {
    if (movimentacao?.id) {
      if (!getValues("id")) {
        (Object.keys(movimentacao) as (keyof IMovimentacao)[]).forEach(
          (key) => {
            setValue(
              key as keyof IMovimentacao,
              movimentacao[key] as IMovimentacao[keyof IMovimentacao]
            );
            if (key === "valor") {
              setValorOriginal(movimentacao[key]);
            }
          }
        );
      }
    }
  });

  const { mutate: adicionar } = useMutationAdicionarMovimentacao();

  const { mutate: editar } = useMutationEditarMovimentacao();

  const onSubmit = () => {
    handleSubmit(async (data) => {
      const payload: IMovimentacao = {
        id: data.id,
        usuario: usuario.id,
        data: data.data,
        tipo: data.tipo,
        categoria: data.categoria,
        conta: data.conta,
        valor: data.valor,
        pago: data.pago ?? true,
        observacao: data.observacao ?? "",
      };
      if (data.id) {
        editar(payload, {
          onSuccess: () => {
            handleModalMovimentacoes();
            refecthMovimentacoes();
          },
          onError: () => {
            handleModalMovimentacoes;
          },
        });
      } else {
        adicionar(payload, {
          onSuccess: () => {
            handleModalMovimentacoes();
            refecthMovimentacoes();
          },
          onError: () => {
            handleModalMovimentacoes;
          },
        });
      }
    })();
  };

  const handleModalMovimentacoes = () => {
    setToggleModalMovimentacoes((prevState) => !prevState);
    setMovimentacao(null);
    reset();
    setValorOriginal(0);
    setValue("valor", 0);
  };

  return {
    toggleModalMovimentacoes,
    handleModalMovimentacoes,
    control,
    categorias,
    isFetchingCategorias,
    handleSubmit,
    onSubmit,
    contas,
    isFetchingContas,
    tipos,
    getValues,
    watch,
    setValue,
    saldoConta,
    setValorOriginal,
  };
};
