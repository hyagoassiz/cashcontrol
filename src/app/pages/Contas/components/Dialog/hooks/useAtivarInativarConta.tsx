import { useContext, useEffect, useState } from "react";
import { useListagemContas } from "../../../hooks/useListagemContas";
import { ContaService } from "../../../services/ContaService";
import { ListagemContasContext } from "../../../contexts";

interface IUseAtivarInativarConta {
  handleAtivarInativarConta: (id: string, ativo: boolean) => void;
  isLoading: boolean;
  isOpenDialog: boolean;
  setIsOpenDialog: (setIsOpenDialog: boolean) => void;
}

export const useAtivarInativarConta = (): IUseAtivarInativarConta => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { refetch } = useListagemContas();

  const { ativarInativarContaData} = useContext(ListagemContasContext);

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const handleAtivarInativarConta = async (id: string, ativo: boolean) => {
    try {
      setIsLoading(true);
      await ContaService.ativarInativarConta(id, ativo);
      refetch();
    } catch (error) {
      console.error("Erro ao editar conta:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalDialog = () => {
    setIsOpenDialog((prevState) => !prevState);
  };

  useEffect(() => {
    if (ativarInativarContaData) {
      handleModalDialog();
    }
  }, [ativarInativarContaData]);

  return {
    handleAtivarInativarConta,
    isLoading,
    isOpenDialog,
    setIsOpenDialog,
  };
};
