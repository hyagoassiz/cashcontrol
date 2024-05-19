/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { IConta } from "../interfaces";
import { obterContasPorUsuario } from "../services/endpoints";
import { ListagemContasContext } from "../contexts";
// import { ProgressContext } from "../../../shared/contexts/ProgressContext";

interface IUseListagemContas {
  isLoading: boolean;
  contas: IConta[];
  modeShowConta: boolean;
  handleModalConta: () => void;
  handleEditarConta: () => void;
  conta: IConta | null;
  toggleModalConta: boolean;
  handleShowConta(handleShowConta: IConta): void;
}

export const useListagemContas = (): IUseListagemContas => {
  const { filterData } = useContext(ListagemContasContext);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [contas, setContas] = useState<IConta[]>([]);

  const [modeShowConta, setModeShowConta] = useState<boolean>(false);
  const [toggleModalConta, setToggleModalConta] = useState<boolean>(false);
  const [conta, setConta] = useState<IConta | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const contasDoUsuario = await obterContasPorUsuario(
        "DxARypJQGMZeb1fMT4ft4BI4S2D2",
        filterData
      );
      console.log(filterData);
      setContas(contasDoUsuario);
    } catch (error) {
      console.error("Erro ao obter contas do usuário:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterData]);

  const handleShowConta = (data: IConta) => {
    setConta(data);
    setModeShowConta(true);
    handleModalConta();
  };

  const handleModalConta = () => {
    setToggleModalConta((prevState) => !prevState);
    setModeShowConta(false);
  };

  const handleEditarConta = () => {
    setModeShowConta(false);
  };

  return {
    isLoading,
    contas,
    modeShowConta,
    handleModalConta,
    handleEditarConta,
    conta,
    toggleModalConta,
    handleShowConta,
  };
};
