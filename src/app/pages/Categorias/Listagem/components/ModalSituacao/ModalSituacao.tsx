import { Button, Typography, useTheme } from "@mui/material";
import { useModalSituacao } from "./hooks/useModalSituacao";
import { MuiModal } from "../../../../../shared/components/MuiModal/MuiModal";

const ModalSituacao = () => {
  const { handleModalSituacao, handleConfirm, toggleModalSituacao, categoria } =
    useModalSituacao();

  const theme = useTheme();

  return (
    <MuiModal
      open={toggleModalSituacao}
      title={categoria?.ativo ? "Inativar" : "Ativar"}
      style={{ width: "400px" }}
      buttons={
        <>
          <Button
            color="secondary"
            variant="text"
            onClick={handleModalSituacao}
          >
            Fechar
          </Button>
          <Button color="secondary" variant="contained" onClick={handleConfirm}>
            Confirmar
          </Button>
        </>
      }
    >
      <Typography color={theme.palette.text.primary}>
        {categoria?.ativo
          ? `Tem certeza que deseja inativar ${categoria?.nome}?`
          : `Tem certeza que deseja ativar ${categoria?.nome}?`}
      </Typography>
    </MuiModal>
  );
};

export default ModalSituacao;
