import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { ListagemCategoriasContext } from "../../../contexts";
import { CategoriaService } from "../../../services/CategoriaService";
import { ICategoria } from "../../../../../../shared/interfaces";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";

interface IUseModalSituacao {
  toggleModalSituacao: boolean;
  categoria: ICategoria | undefined;
  handleConfirm: () => void;
  handleModalSituacao: () => void;
}

export const useModalSituacao = (): IUseModalSituacao => {
  const {
    categoria,
    toggleModalSituacao,
    setToggleModalSituacao,
    setCategoria,
  } = useContext(ListagemCategoriasContext);

  const dispatch = useDispatch();

  const querClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: CategoriaService.editarSituacao,
    onSuccess: () => {
      querClient.invalidateQueries({ queryKey: ["categorias"] });
      dispatch(
        showSnackbar(
          `Conta ${
            categoria?.ativo === false ? "ativada" : "inativada"
          } com sucesso`
        )
      );
    },
    onError: (error) => {
      console.error(error);
      dispatch(showSnackbar("Erro", "error"));
    },
  });

  const handleConfirm = () => {
    if (categoria) {
      mutate({
        id: categoria.id,
        ativo: !categoria.ativo,
      });
    }
    handleModalSituacao();
  };

  const handleModalSituacao = () => {
    setToggleModalSituacao((prevState) => !prevState);
    setCategoria(undefined);
  };

  return {
    toggleModalSituacao,
    categoria,
    handleConfirm,
    handleModalSituacao,
  };
};
