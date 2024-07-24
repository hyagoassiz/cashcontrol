import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { IMovimentacao, IReturnBackEnd } from "../interfaces";
import { MovimentacaoService } from "../services/movimentacaoService";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../redux/snackBar/actions";

export const useMutationEditarMovimentacao = (): UseMutationResult<
  IReturnBackEnd,
  unknown,
  IMovimentacao
> => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (payload: IMovimentacao) =>
      MovimentacaoService.editMovimentacao(payload),
    onSuccess: (_, variables) => {
      dispatch(
        showSnackbar(
          `${
            variables.tipo === "Entrada" ? "Entrada" : "Saída"
          } editada com sucesso`
        )
      );
    },
    onError: (_, variables) => {
      dispatch(
        showSnackbar(
          `Erro ao editar ${variables.tipo === "Entrada" ? "Entrada" : "Saída"}`
        )
      );
    },
  });
};
