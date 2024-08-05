import { Button } from "@mui/material";
import MuiDialog from "../../../../../shared/components/MuiDialog/MuiDialog";
import { useAtivarInativarConta } from "./hooks/useAtivarInativarConta";

const Dialog = () => {
  const { isOpenDialog, handleModalDialog, conta, handleConfirm } =
    useAtivarInativarConta();

  return (
    <MuiDialog
      open={isOpenDialog}
      title={conta?.ativo ? "Inativar" : "Ativar"}
      message={
        conta?.ativo
          ? `Tem certeza que deseja inativar ${conta?.nome}?`
          : `Tem certeza que deseja ativar ${conta?.nome}?`
      }
      buttons={
        <>
          <Button variant="text" onClick={handleModalDialog}>
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
