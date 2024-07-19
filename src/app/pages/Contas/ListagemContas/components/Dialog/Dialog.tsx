import { Button } from "@mui/material";
import MuiDialog from "../../../../../shared/components/MuiDialog/MuiDialog";
import { useAtivarInativarConta } from "./hooks/useAtivarInativarConta";

const Dialog = () => {
  const { isOpenDialog, setIsOpenDialog, ativarInativarContaData, handleConfirm } =
    useAtivarInativarConta();

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
          <Button variant="contained" onClick={handleConfirm}>
            Confirmar
          </Button>
        </>
      }
    ></MuiDialog>
  );
};

export default Dialog;
