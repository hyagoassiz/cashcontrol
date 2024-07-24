import { useContext, useEffect } from "react";
import { ListagemContext } from "../../../context";
import { Control, useForm, UseFormHandleSubmit } from "react-hook-form";
import { IMovimentacao } from "../../../interfaces";
import { getTodayDate } from "../../../../../../shared/utils/getTodayDate";
import { useQueryListarCategoria } from "../../../../../../shared/hooks/useQueryListarCategoria";
import { ICategoria, IConta } from "../../../../../../shared/interfaces";
import { GlobalContext } from "../../../../../../shared/contexts";
import { useQueryListarConta } from "../../../../../../shared/hooks/useQueryListarConta";
import { useMutationAdicionarMovimentacao } from "../../../../../../shared/hooks/useMutationAdicionarMovimentacao";
import { useMutationEditarMovimentacao } from "../../../../../../shared/hooks/useMutationEditarMovimentacao";

interface IUseModalMovimentacoes {
  toggleModalMovimentacoes: boolean;
  handleModalMovimentacoes: () => void;
  control: Control<IMovimentacao>;
  isEntrada: boolean;
  categorias: ICategoria[] | undefined;
  isFetchingCategorias: boolean;
  contas: IConta[] | undefined;
  isFetchingContas: boolean;
  handleSubmit: UseFormHandleSubmit<IMovimentacao>;
  onSubmit: () => void;
}

export const useModalMovimentacoes = (): IUseModalMovimentacoes => {
  const {
    toggleModalMovimentacoes,
    setToggleModalMovimentacoes,
    isEntrada,
    refecthMovimentacoes,
    movimentacao,
    setMovimentacao
  } = useContext(ListagemContext);

  const { control, handleSubmit, setValue, reset } = useForm<IMovimentacao>({
    defaultValues: {
      data: getTodayDate(),
    },
  });

  const { usuario } = useContext(GlobalContext);

  const { data: categorias, isLoading: isFetchingCategorias } =
    useQueryListarCategoria({ id: usuario.id });

  const { data: contas, isLoading: isFetchingContas } = useQueryListarConta({
    id: usuario.id,
  });

  useEffect(() => {
    if (movimentacao?.id) {
      (Object.keys(movimentacao) as (keyof IMovimentacao)[]).forEach((key) => {
        setValue(
          key as keyof IMovimentacao,
          movimentacao[key] as IMovimentacao[keyof IMovimentacao]
        );
      });
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
        tipo: isEntrada ? "Entrada" : "Saída",
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
    reset()
  };

  return {
    toggleModalMovimentacoes,
    handleModalMovimentacoes,
    control,
    isEntrada,
    categorias,
    isFetchingCategorias,
    handleSubmit,
    onSubmit,
    contas,
    isFetchingContas,
  };
};
