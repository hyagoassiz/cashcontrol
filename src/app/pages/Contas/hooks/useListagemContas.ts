import { useContext, useEffect, useState } from "react";
import { IConta } from "../interfaces";
import { obterContasPorUsuario } from "../services/endpoints";
import { ListagemContasContext } from "../contexts";
import { useNavigate } from "react-router-dom";
import * as PATHS from "../../../routes/paths";

interface IUseListagemContas {
  isLoading: boolean;
  contas: IConta[];
  modeShowConta: boolean;
  handleModalConta: () => void;
  handleEditarConta: () => void;
  conta: IConta | null;
  toggleModalConta: boolean;
  handleShowConta(handleShowConta: IConta): void;
  modeEditConta: boolean
  fetchData: () => void
  handleNavigate: () => void
}

export const useListagemContas = (): IUseListagemContas => {
  const { filterData } = useContext(ListagemContasContext);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [contas, setContas] = useState<IConta[]>([]);

  const [modeShowConta, setModeShowConta] = useState<boolean>(false);
  const [modeEditConta, setModeEditConta] = useState<boolean>(false);
  const [toggleModalConta, setToggleModalConta] = useState<boolean>(false);
  const [conta, setConta] = useState<IConta | null>(null);
  const navigate = useNavigate()
  

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
    if (conta) {
      setConta(null)
      setModeShowConta(false);
      setModeEditConta(false)
    }
    setToggleModalConta((prevState) => !prevState);
  };

  const handleEditarConta = () => {
    setModeShowConta(false);
    setModeEditConta(true)
  };

  const handleNavigate = () => {
    navigate(PATHS.MENU.LIST);
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
    modeEditConta,
    fetchData,
    handleNavigate
  };
};
