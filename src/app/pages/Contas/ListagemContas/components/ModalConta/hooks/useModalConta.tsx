import { IConta } from "../../../interfaces";
import { Control, useForm, UseFormGetValues } from "react-hook-form";
import { ContaService } from "../../../services/ContaService";
import { useContext, useEffect } from "react";
import { ListagemContasContext } from "../../../contexts";
import { GlobalContext } from "../../../../../../shared/contexts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IUseModalConta {
  control: Control<IConta>;
  tipos: string[];
  onSubmit: () => void;
  toggleModalConta: boolean;
  handleModalConta: () => void;
  getValues: UseFormGetValues<IConta>;
}

export const useModalConta = (): IUseModalConta => {
  const { toggleModalConta, setToggleModalConta, conta, setConta } = useContext(
    ListagemContasContext
  );

  const { usuario } = useContext(GlobalContext);

  const { handleSubmit, control, getValues, setValue } = useForm<IConta>();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ContaService.criarConta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contas"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: editarConta } = useMutation({
    mutationFn: ContaService.editarConta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contas"] });
    },
    onError: (error) => {
      console.log(error);
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
        mutate(payload);
      }
    })();
  };

  const handleModalConta = () => {
    setToggleModalConta((prevState) => !prevState);
    setConta(undefined);
  };

  return {
    control,
    tipos,
    onSubmit,
    toggleModalConta,
    handleModalConta,
    getValues,
  };
};
