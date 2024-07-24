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
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const { toggleModalConta, setToggleModalConta, conta, setConta } = useContext(
    ListagemContasContext
  );

  const { usuario } = useContext(GlobalContext);

  const { handleSubmit, control, getValues, setValue, reset } =
    useForm<IConta>();

  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationFn: ContaService.criarConta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contas"] });
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
      queryClient.invalidateQueries({ queryKey: ["contas"] });
      dispatch(showSnackbar("Conta editada com sucesso"));
    },
    onError: (error) => {
      console.log(error);
      dispatch(showSnackbar("Erro ao editar conta", "error"));
    },
  });

  const tipos = ["Conta Corrente", "Poupança", "Investimentos", "Outros"];

  useEffect(() => {
    if (conta?.id) {
      (Object.keys(conta) as (keyof IConta)[]).forEach((key) => {
        setValue(key as keyof IConta, conta[key] as IConta[keyof IConta]);
      });
    }
    return () => setConta(undefined);
  });

  const onSubmit = () => {
    handleModalConta();
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
        console.log(payload);
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
