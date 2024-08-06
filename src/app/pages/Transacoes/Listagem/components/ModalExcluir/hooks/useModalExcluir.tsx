import { useContext } from "react";
import { ListagemContext } from "../../../context";
import { useMutationExcluirMovimentacao } from "../../../../../../shared/hooks/useMutationExcluirMovimentacao copy";
import { ITransacao } from "../../../../../../shared/interfaces";

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
    refetchTransacoes,
  } = useContext(ListagemContext);

  const { mutate } = useMutationExcluirMovimentacao();

  const handleConfirm = () => {
    if (transacao) {
      mutate(transacao, {
        onSuccess: () => {
          handleModalExcluir();
          refetchTransacoes();
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
