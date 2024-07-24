import { IConta } from "../../../interfaces";
import {
  Control,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
} from "react-hook-form";
import { ContaService } from "../../../services/ContaService";
import { useContext, useEffect } from "react";
import { ListagemContasContext } from "../../../contexts";
import { GlobalContext } from "../../../../../../shared/contexts";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";

interface IUseModalConta {
  control: Control<IConta>;
  tipos: string[];
  onSubmit: () => void;
  toggleModalConta: boolean;
  handleModalConta: () => void;
  getValues: UseFormGetValues<IConta>;
  handleSubmit: UseFormHandleSubmit<IConta>;
}

export const useModalConta = (): IUseModalConta => {
  const { toggleModalConta, setToggleModalConta, conta, setConta, refetch } =
    useContext(ListagemContasContext);

  const { usuario } = useContext(GlobalContext);

  const { handleSubmit, control, getValues, setValue, reset } =
    useForm<IConta>();

  const dispatch = useDispatch();

  const { mutate: adicionarConta } = useMutation({
    mutationFn: ContaService.criarConta,
    onSuccess: () => {
      refetch();
      handleModalConta();
      dispatch(showSnackbar("Conta criada com sucesso"));
    },
    onError: (error) => {
      console.log(error);
      dispatch(showSnackbar("Erro ao criar conta", "error"));
    },
  });

  const { mutate: editarConta } = useMutation({
    mutationFn: ContaService.editarConta,
    onSuccess: () => {
      refetch();
      handleModalConta();
      dispatch(showSnackbar("Conta editada com sucesso"));
    },
    onError: (error) => {
      console.log(error);
      dispatch(showSnackbar("Erro ao editar conta", "error"));
    },
  });

  const tipos = ["Conta Corrente", "Poupança", "Investimentos", "Outros"];

  useEffect(() => {
    if (conta?.id && toggleModalConta) {
      (Object.keys(conta) as (keyof IConta)[]).forEach((key) => {
        setValue(key as keyof IConta, conta[key] as IConta[keyof IConta]);
      });
    }
  });

  const onSubmit = () => {
    handleSubmit(async (data) => {
      const payload: IConta = {
        id: data.id,
        usuario: usuario.id,
        nome: data.nome,
        tipoConta: data.tipoConta,
        agencia: data.agencia ?? "",
        ativo: true,
        incluirSoma: data.incluirSoma ?? true,
        conta: data.conta ?? "",
        observacao: data.observacao ?? "",
      };
      if (data.id) {
        editarConta(payload);
      } else {
        adicionarConta(payload);
      }
    })();
  };

  const handleModalConta = () => {
    setToggleModalConta((prevState) => !prevState);
    setConta(undefined);
    reset();
  };

  return {
    control,
    tipos,
    onSubmit,
    toggleModalConta,
    handleModalConta,
    getValues,
    handleSubmit,
  };
};
