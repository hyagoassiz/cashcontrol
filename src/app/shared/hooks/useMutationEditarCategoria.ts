import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ICategoria, IReturnBackEnd } from "../interfaces";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../redux/snackBar/actions";
import { CategoriaService } from "../services/categoriaService";

export const useMutationEditarCategoria = (): UseMutationResult<
  IReturnBackEnd,
  unknown,
  ICategoria
> => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (payload: ICategoria) =>
      CategoriaService.editCategoria(payload),
    onSuccess: () => {
      dispatch(showSnackbar("Categoria editada com sucesso"));
    },
    onError: () => {
      dispatch(showSnackbar("Erro ao editar categoria"));
    },
  });
};
