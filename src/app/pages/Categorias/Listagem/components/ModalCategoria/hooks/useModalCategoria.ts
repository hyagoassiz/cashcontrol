/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect } from "react";
import { ListagemCategoriasContext } from "../../../contexts";
import {
  Control,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
} from "react-hook-form";
import { ICategoria } from "../../../../../../shared/interfaces";
import { GlobalContext } from "../../../../../../shared/contexts";
import { useMutationAdicionarCategoria } from "../../../../../../shared/hooks/useMutationAdicionarCategoria";
import { useMutationEditarCategoria } from "../../../../../../shared/hooks/useMutationEditarCategoria";

interface IUseModalCategoria {
  toggleModalCategoria: boolean;
  handleModalCategoria: () => void;
  handleSubmit: UseFormHandleSubmit<ICategoria>;
  control: Control<ICategoria>;
  onSubmit: () => void;
  tipos: string[];
  getValues: UseFormGetValues<ICategoria>;
}

export const useModalCategoria = (): IUseModalCategoria => {
  const {
    toggleModalCategoria,
    setToggleModalCategoria,
    categoria,
    refetch,
    setCategoria,
    toggleModalSituacao,
  } = useContext(ListagemCategoriasContext);

  const { usuario } = useContext(GlobalContext);

  const { handleSubmit, control, setValue, getValues, reset } =
    useForm<ICategoria>();

  const tipos = ["Entrada", "Saída"];

  useEffect(() => {
    if (categoria?.id && !toggleModalSituacao) {
      (Object.keys(categoria) as (keyof ICategoria)[]).forEach((key) => {
        setValue(
          key as keyof ICategoria,
          categoria[key] as ICategoria[keyof ICategoria]
        );
      });
    }
  });

  const { mutate: adicionarCategoria } = useMutationAdicionarCategoria();

  const { mutate: editarCategoria } = useMutationEditarCategoria();

  const onSubmit = () => {
    handleSubmit(async (data) => {
      const payload: ICategoria = {
        id: data.id,
        usuario: usuario.uid,
        nome: data.nome,
        ativo: data.ativo || true,
        tipo: data.tipo,
      };
      if (data.id) {
        editarCategoria(payload, {
          onSuccess: () => {
            handleModalCategoria();
            refetch();
          },
        });
      } else {
        adicionarCategoria(payload, {
          onSuccess: () => {
            handleModalCategoria();
            refetch();
          },
        });
      }
    })();
  };

  const handleModalCategoria = () => {
    setToggleModalCategoria((prevState) => !prevState);
    reset();
    setCategoria(undefined);
  };

  return {
    toggleModalCategoria,
    handleModalCategoria,
    handleSubmit,
    control,
    onSubmit,
    tipos,
    getValues,
  };
};
