import { useContext } from "react";
import { ListagemContext } from "../../../context";
import { useMutationExcluirMovimentacao } from "../../../../../../shared/hooks/useMutationExcluirMovimentacao copy";
import { IMovimentacao } from "../../../interfaces";

interface IUseModalExcluir {
  toggleModalExcluir: boolean;
  handleConfirm: () => void;
  handleModalExcluir: () => void;
  movimentacao: IMovimentacao | null
}

export const useModalExcluir = (): IUseModalExcluir => {
  const {
    movimentacao,
    setMovimentacao,
    setToggleModalExcluir,
    toggleModalExcluir,
    refecthMovimentacoes,
  } = useContext(ListagemContext);

  const { mutate } = useMutationExcluirMovimentacao();

  const handleConfirm = () => {
    if (movimentacao) {
      mutate(movimentacao, {
        onSuccess: () => {
          handleModalExcluir()
          refecthMovimentacoes()
        },
      });
    }
  };

  const handleModalExcluir = () => {
    setToggleModalExcluir((prevState) => !prevState);
    setMovimentacao(null);
  };

  return {
    toggleModalExcluir,
    handleConfirm,
    handleModalExcluir,
    movimentacao
  };
};
