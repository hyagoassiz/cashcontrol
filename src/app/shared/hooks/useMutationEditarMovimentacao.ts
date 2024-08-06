import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { IReturnBackEnd, ITransacao } from "../interfaces";
import { MovimentacaoService } from "../services/movimentacaoService";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../redux/snackBar/actions";

export const useMutationEditarMovimentacao = (): UseMutationResult<
  IReturnBackEnd,
  unknown,
  ITransacao
> => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (payload: ITransacao) =>
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
