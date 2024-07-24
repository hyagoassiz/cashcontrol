import { Dispatch, useContext } from "react";
import { ListagemContasContext } from "../../../contexts";
import { IFilterData } from "../../../interfaces";
import { Control, useForm, UseFormHandleSubmit } from "react-hook-form";

interface IUseFilter {
  toggleFilter: boolean;
  setToggleFilter: Dispatch<boolean>
  control: Control<IFilterData>;
  handleSubmit: UseFormHandleSubmit<IFilterData>;
  onSubmit(data: IFilterData): void
}

export const useFilter = (): IUseFilter => {
  const { toggleFilter, setToggleFilter, setFilterData } = useContext(
    ListagemContasContext
  );

  const {
    control,
    handleSubmit,
  } = useForm<IFilterData>();

  const onSubmit = (data: IFilterData) => {
    // const situacao: boolean[] = data.ativo
    //   ? data.ativo.map((option) => option === true)
    //   : [];

    setFilterData(data);

    setToggleFilter(false);
  };

  return {
    toggleFilter,
    setToggleFilter,
    control,
    handleSubmit,
    onSubmit
  };
};
