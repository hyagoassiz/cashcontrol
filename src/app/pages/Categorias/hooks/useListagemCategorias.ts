/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { ICategoria } from "../interfaces";
import { obterCategoriasPorUsuario } from "../services/endpoints";

interface IUseListagemCategorias {
  isLoading: boolean;
  categorias: ICategoria[];
  setTextFilter: (data: string ) => void;
  textFilter: string 
}

export const useListagemCategorias = (): IUseListagemCategorias => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [pre, setPre] = useState<ICategoria[]>([]);
  const [textFilter, setTextFilter] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const categoriasDoUsuario = await obterCategoriasPorUsuario(
          "DxARypJQGMZeb1fMT4ft4BI4S2D2"
        );
        setPre(categoriasDoUsuario);
      } catch (error) {
        console.error("Erro ao obter categorias do usuário:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (textFilter.length > 2) {
      fetchData();
    } else {
      const result = pre.filter(
        (value) =>
          value.nome.toUpperCase().includes(textFilter.toUpperCase()) ||
          String(value.nome).toUpperCase().includes(textFilter.toUpperCase())
      );
      setCategorias(result);
    }
  }, [textFilter]);

  return {
    isLoading,
    categorias,
    setTextFilter,
    textFilter,
  };
};
