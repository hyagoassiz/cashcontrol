import { Button, Typography, useTheme } from "@mui/material";
import { useModalExcluir } from "./hooks/useModalExcluir";
import { MuiModal } from "../../../../../shared/components/MuiModal/MuiModal";

const ModalExcluir = () => {
  const { toggleModalExcluir, handleConfirm, handleModalExcluir, transacao } =
    useModalExcluir();

  const theme = useTheme();

  return (
    <MuiModal
      open={toggleModalExcluir}
      title="Excluir"
      style={{ width: "400px" }}
      buttons={
        <>
          <Button color="secondary" variant="text" onClick={handleModalExcluir}>
            Fechar
          </Button>
          <Button color="secondary" variant="contained" onClick={handleConfirm}>
            Confirmar
          </Button>
        </>
      }
    >
      <Typography
        color={theme.palette.text.primary}
      >{`Tem certeza que deseja excluir esta ${
        transacao?.tipo === "Entrada" ? "Entrada" : "Saída"
      }?`}</Typography>
    </MuiModal>
  );
};

export default ModalExcluir;
