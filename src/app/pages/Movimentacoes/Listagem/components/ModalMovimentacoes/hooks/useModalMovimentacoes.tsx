import { useContext, useEffect } from "react";
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
}

export const useModalMovimentacoes = (): IUseModalMovimentacoes => {
  const {
    toggleModalMovimentacoes,
    setToggleModalMovimentacoes,
    refecthMovimentacoes,
    movimentacao,
    setMovimentacao,
  } = useContext(ListagemContext);

  const { usuario } = useContext(GlobalContext);

  const { control, handleSubmit, setValue, reset, getValues, watch } =
    useForm<IMovimentacao>({
      defaultValues: {
        data: getTodayDate(),
      },
    });

  const { data: categorias, isLoading: isFetchingCategorias } =
    useQueryListarCategoria({ id: usuario.id });

  const { data: contas, isLoading: isFetchingContas } = useQueryListarConta({
    id: usuario.id,
  });

  const tipos = ["Entrada", "Saída"];

  useEffect(() => {
    if (movimentacao?.id) {
      if (!getValues("id")) {
        (Object.keys(movimentacao) as (keyof IMovimentacao)[]).forEach(
          (key) => {
            setValue(
              key as keyof IMovimentacao,
              movimentacao[key] as IMovimentacao[keyof IMovimentacao]
            );
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
  };
};
