import { Button, Typography, useTheme } from "@mui/material";
import { useAtivarInativarConta } from "./hooks/useAtivarInativarConta";
import { MuiModal } from "../../../../../shared/components/MuiModal/MuiModal";

const Dialog = () => {
  const { isOpenDialog, handleModalDialog, conta, handleConfirm } =
    useAtivarInativarConta();

  const theme = useTheme();

  return (
    <MuiModal
      open={isOpenDialog}
      title={conta?.ativo ? "Inativar" : "Ativar"}
      style={{ width: "400px" }}
      buttons={
        <>
          <Button color="secondary" variant="text" onClick={handleModalDialog}>
            Fechar
          </Button>
          <Button color="secondary" variant="contained" onClick={handleConfirm}>
            Confirmar
          </Button>
        </>
      }
    >
      <Typography color={theme.palette.text.primary}>
        {conta?.ativo
          ? `Tem certeza que deseja inativar ${conta?.nome}?`
          : `Tem certeza que deseja ativar ${conta?.nome}?`}
      </Typography>
    </MuiModal>
  );
};

export default Dialog;
