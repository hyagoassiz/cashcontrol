import { useContext } from "react";
import { ListagemContext } from "../../../context";
import { useMutationExcluirMovimentacao } from "../../../../../../shared/hooks/useMutationExcluirMovimentacao copy";
import { ITransacao } from "../../../interfaces";

interface IUseModalExcluir {
  toggleModalExcluir: boolean;
  handleConfirm: () => void;
  handleModalExcluir: () => void;
  transacao: ITransacao | null;
}

export const useModalExcluir = (): IUseModalExcluir => {
  const {
    transacao,
    setTransacao,
    setToggleModalExcluir,
    toggleModalExcluir,
    refecthMovimentacoes,
  } = useContext(ListagemContext);

  const { mutate } = useMutationExcluirMovimentacao();

  const handleConfirm = () => {
    if (transacao) {
      mutate(transacao, {
        onSuccess: () => {
          handleModalExcluir();
          refecthMovimentacoes();
        },
      });
    }
  };

  const handleModalExcluir = () => {
    setToggleModalExcluir((prevState) => !prevState);
    setTransacao(null);
  };

  return {
    toggleModalExcluir,
    handleConfirm,
    handleModalExcluir,
    transacao,
  };
};
