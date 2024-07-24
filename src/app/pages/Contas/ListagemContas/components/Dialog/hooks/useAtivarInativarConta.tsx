import { useContext, useEffect, useState } from "react";
import { ContaService } from "../../../services/ContaService";
import { ListagemContasContext } from "../../../contexts";
import { IConta } from "../../../interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";

interface IUseAtivarInativarConta {
  isOpenDialog: boolean;
  setIsOpenDialog: (setIsOpenDialog: boolean) => void;
  ativarInativarContaData: IConta | null;
  handleConfirm: () => void;
}

export const useAtivarInativarConta = (): IUseAtivarInativarConta => {
  const { ativarInativarContaData } = useContext(ListagemContasContext);

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const dispatch = useDispatch();

  const querClient = useQueryClient();

  useEffect(() => {
    if (ativarInativarContaData) {
      handleModalDialog();
    }
  }, [ativarInativarContaData]);

  const { mutate } = useMutation({
    mutationFn: ContaService.ativarInativarConta,
    onSuccess: () => {
      querClient.invalidateQueries({ queryKey: ["contas"] });
      dispatch(
        showSnackbar(
          `Conta ${ativarInativarContaData?.ativo === false ? "ativada" : "inativada"} com sucesso`
        )
      );
    },
    onError: (error) => {
      console.log(error);
      dispatch(showSnackbar("Erro", "error"));
    },
  });

  const handleConfirm = () => {
    if (ativarInativarContaData) {
      mutate({
        id: ativarInativarContaData.id,
        ativo: !ativarInativarContaData.ativo,
      });
    }
    setIsOpenDialog((prevState) => !prevState);
  };

  const handleModalDialog = () => {
    setIsOpenDialog((prevState) => !prevState);
  };

  return {
    isOpenDialog,
    setIsOpenDialog,
    ativarInativarContaData,
    handleConfirm,
  };
};
