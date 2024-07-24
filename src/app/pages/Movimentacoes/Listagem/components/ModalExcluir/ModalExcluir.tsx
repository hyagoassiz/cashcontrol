import { Button } from "@mui/material";
import MuiDialog from "../../../../../shared/components/MuiDialog/MuiDialog";
import { useModalExcluir } from "./hooks/useModalExcluir";

const ModalExcluir = () => {
  const {
    toggleModalExcluir,
    handleConfirm,
    handleModalExcluir,
    movimentacao,
  } = useModalExcluir();

  return (
    <MuiDialog
      open={toggleModalExcluir}
      title="Excluir"
      message={`Tem certeza que deseja excluir esta ${
        movimentacao?.tipo === "Entrada" ? "Entrada" : "Saída"
      }?`}
      buttons={
        <>
          <Button variant="text" onClick={handleModalExcluir}>
            Fechar
          </Button>
          <Button variant="contained" onClick={handleConfirm}>
            Confirmar
          </Button>
        </>
      }
    />
  );
};

export default ModalExcluir;
