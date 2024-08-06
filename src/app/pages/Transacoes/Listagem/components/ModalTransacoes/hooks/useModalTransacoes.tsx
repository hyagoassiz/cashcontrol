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
import { ITransacao } from "../../../interfaces";
import { getTodayDate } from "../../../../../../shared/utils/getTodayDate";
import { ICategoria, IConta } from "../../../../../../shared/interfaces";
import { GlobalContext } from "../../../../../../shared/contexts";
import { useMutationAdicionarMovimentacao } from "../../../../../../shared/hooks/useMutationAdicionarMovimentacao";
import { useMutationEditarMovimentacao } from "../../../../../../shared/hooks/useMutationEditarMovimentacao";
import { getSaldo } from "../../../../../../shared/utils/getSaldo";
import { useQueryListarCategorias } from "../../../../../../shared/hooks/categorias/useQuery/useQueryListarCategorias";
import { useQueryListarContas } from "../../../../../../shared/hooks/contas/useQuery/useQueryListarContas";

interface ISaldoConta {
  saldo: number;
  valorDigitado: number;
  novoSaldo: number;
}
interface IUseModalTransacoes {
  toggleModalTransacoes: boolean;
  handleModalMovimentacoes: () => void;
  control: Control<ITransacao>;
  categorias: ICategoria[] | undefined;
  isFetchingCategorias: boolean;
  contas: IConta[] | undefined;
  isFetchingContas: boolean;
  handleSubmit: UseFormHandleSubmit<ITransacao>;
  onSubmit: () => void;
  tipos: string[];
  getValues: UseFormGetValues<ITransacao>;
  watch: UseFormWatch<ITransacao>;
  setValue: UseFormSetValue<ITransacao>;
  saldoConta: ISaldoConta;
  setValorOriginal: Dispatch<SetStateAction<number>>;
}

export const useModalTransacoes = (): IUseModalTransacoes => {
  const {
    toggleModalTransacoes,
    setToggleModalTransacoes,
    refecthMovimentacoes,
    transacao,
    setTransacao,
    saldos,
  } = useContext(ListagemContext);

  const { usuario } = useContext(GlobalContext);

  const { control, handleSubmit, setValue, reset, getValues, watch } =
    useForm<ITransacao>({
      defaultValues: {
        data: getTodayDate(),
        pago: true,
      },
    });

  const { data: categorias, isLoading: isFetchingCategorias } =
    useQueryListarCategorias({
      tipo: getValues("tipo") === "Entrada" ? ["Entrada"] : ["Saída"],
      ativo: [true],
    });

  const { data: contas, isLoading: isFetchingContas } = useQueryListarContas({
    ativo: [true],
    tipoConta: ["Conta Corrente", "Conta Corrente", "Outros", "Poupança"],
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
    if (transacao?.id) {
      if (!getValues("id")) {
        (Object.keys(transacao) as (keyof ITransacao)[]).forEach((key) => {
          setValue(
            key as keyof ITransacao,
            transacao[key] as ITransacao[keyof ITransacao]
          );
          if (key === "valor") {
            setValorOriginal(transacao[key]);
          }
        });
      }
    }
  });

  const { mutate: adicionar } = useMutationAdicionarMovimentacao();

  const { mutate: editar } = useMutationEditarMovimentacao();

  const onSubmit = () => {
    handleSubmit(async (data) => {
      const payload: ITransacao = {
        id: data.id,
        usuario: usuario.uid,
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
    setToggleModalTransacoes((prevState) => !prevState);
    setTransacao(null);
    reset();
    setValorOriginal(0);
    setValue("valor", 0);
  };

  return {
    toggleModalTransacoes,
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
