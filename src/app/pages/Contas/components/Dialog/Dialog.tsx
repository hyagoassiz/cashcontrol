import { Button } from "@mui/material";
import MuiDialog from "../../../../shared/components/MuiDialog/MuiDialog";
import { useContext } from "react";
import { useAtivarInativarConta } from "./hooks/useAtivarInativarConta";
import { ListagemContasContext } from "../../contexts";

const Dialog = () => {
  const {  ativarInativarContaData,  } =
    useContext(ListagemContasContext);
  const { handleAtivarInativarConta, isOpenDialog, setIsOpenDialog } = useAtivarInativarConta()

  const handleConfirm = () => {
    if (ativarInativarContaData) {
      handleAtivarInativarConta(ativarInativarContaData.id, !ativarInativarContaData.ativo);
      setIsOpenDialog(false)
    }
    
  };

  return (
    <MuiDialog
      open={isOpenDialog}
      title={ativarInativarContaData?.ativo ? "Inativar" : "Ativar"}
      message={
        ativarInativarContaData?.ativo
          ? `Tem certeza que deseja inativar ${ativarInativarContaData?.nome}?`
          : `Tem certeza que deseja ativar ${ativarInativarContaData?.nome}?`
      }
      buttons={
        <>
          <Button variant="text" onClick={() => setIsOpenDialog(false)}>
            Fechar
          </Button>
          <Button variant="contained" onClick={handleConfirm}>Confirmar</Button>
        </>
      }
    ></MuiDialog>
  );
};

export default Dialog;
