/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import {  IConta } from "../interfaces";
import {  obterContasPorUsuario } from "../services/endpoints";
import {  ListagemContasContext } from "../contexts";
// import { ProgressContext } from "../../../shared/contexts/ProgressContext";

interface IUseListagemContas {
  isLoading: boolean;
  contas: IConta[]
}

export const useListagemContas = (): IUseListagemContas => {
  const {   filterData} = useContext(ListagemContasContext)

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [contas, setContas] = useState<IConta[]>([]);

  


  // const { setLoading} = useContext(ProgressContext)
  

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const contasDoUsuario = await obterContasPorUsuario(
        "DxARypJQGMZeb1fMT4ft4BI4S2D2", filterData
      );
      console.log(filterData)
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


 
  return {
    isLoading,
    contas
  };
};
