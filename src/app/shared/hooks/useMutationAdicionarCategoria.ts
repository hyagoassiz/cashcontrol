import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ICategoria, IReturnBackEnd } from "../interfaces";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../redux/snackBar/actions";
import { CategoriaService } from "../services/categoriaService";

export const useMutationAdicionarCategoria = (): UseMutationResult<
  IReturnBackEnd,
  unknown,
  ICategoria
> => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (payload: ICategoria) => CategoriaService.addCategoria(payload),
    onSuccess: () => {
      dispatch(showSnackbar("Categoria registrada com sucesso"));
    },
  });
};
