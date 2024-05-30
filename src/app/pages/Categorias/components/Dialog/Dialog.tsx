import { Button } from "@mui/material";
import MuiDialog from "../../../../shared/components/MuiDialog/MuiDialog";
import { useContext } from "react";
import { ListagemCategoriasContext } from "../../contexts";
import { useListagemCategorias } from "../../hooks/useListagemCategorias";

const Dialog = () => {
  const { isOpenDialog, setIsOpenDialog, activateDeactivateData, setReload } =
    useContext(ListagemCategoriasContext);
  const { handleEditarCategoria } = useListagemCategorias();

  const handleConfirm = () => {
    if (activateDeactivateData) {
      handleEditarCategoria(
        activateDeactivateData.id,
        !activateDeactivateData.ativo
      );
      setIsOpenDialog(false);
      setReload((prevState) => !prevState);
    }
  };

  return (
    <MuiDialog
      open={isOpenDialog}
      title={activateDeactivateData?.ativo ? "Inativar" : "Ativar"}
      message={
        activateDeactivateData?.ativo
          ? `Tem certeza que deseja inativar ${activateDeactivateData?.nome}?`
          : `Tem certeza que deseja ativar ${activateDeactivateData?.nome}?`
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
