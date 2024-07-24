import { Button } from "@mui/material";
import { useModalSituacao } from "./hooks/useModalSituacao";
import MuiDialog from "../../../../../shared/components/MuiDialog/MuiDialog";

const ModalSituacao = () => {
  const { handleModalSituacao, handleConfirm, toggleModalSituacao, categoria } =
    useModalSituacao();

  return (
    <MuiDialog
      open={toggleModalSituacao}
      title={categoria?.ativo ? "Inativar" : "Ativar"}
      message={
        categoria?.ativo
          ? `Tem certeza que deseja inativar ${categoria?.nome}?`
          : `Tem certeza que deseja ativar ${categoria?.nome}?`
      }
      buttons={
        <>
          <Button variant="text" onClick={handleModalSituacao}>
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

export default ModalSituacao;
