import { useContext } from "react";
import { ContaService } from "../../../services/ContaService";
import { ListagemContasContext } from "../../../contexts";
import { IConta } from "../../../interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";

interface IUseAtivarInativarConta {
  isOpenDialog: boolean;
  conta: IConta | undefined;
  handleConfirm: () => void;
  handleModalDialog: () => void;
}

export const useAtivarInativarConta = (): IUseAtivarInativarConta => {
  const { conta, isOpenDialog, setIsOpenDialog, setConta } = useContext(
    ListagemContasContext
  );

  const dispatch = useDispatch();

  const querClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ContaService.ativarInativarConta,
    onSuccess: () => {
      querClient.invalidateQueries({ queryKey: ["contas"] });
      dispatch(
        showSnackbar(
          `Conta ${
            conta?.ativo === false ? "ativada" : "inativada"
          } com sucesso`
        )
      );
    },
    onError: (error) => {
      console.error(error);
      dispatch(showSnackbar("Erro", "error"));
    },
  });

  const handleConfirm = () => {
    if (conta && conta.id) {
      mutate({
        id: conta.id,
        ativo: !conta.ativo,
      });
    }
    handleModalDialog();
  };

  const handleModalDialog = () => {
    setIsOpenDialog((prevState) => !prevState);
    setConta(undefined);
  };

  return {
    isOpenDialog,
    conta,
    handleConfirm,
    handleModalDialog,
  };
};
