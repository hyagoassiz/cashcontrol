import { useContext } from "react";
import { IFilterData } from "../../../interfaces";
import { Control, useForm, UseFormHandleSubmit } from "react-hook-form";
import { ListagemCategoriasContext } from "../../../contexts";

interface IUseFilter {
  toggleFilter: boolean;
  control: Control<IFilterData>;
  handleSubmit: UseFormHandleSubmit<IFilterData>;
  onSubmit(data: IFilterData): void;
  handleToggleFilter: () => void;
}

export const useFilter = (): IUseFilter => {
  const { toggleFilter, setToggleFilter, setFilterData } = useContext(
    ListagemCategoriasContext
  );

  const { control, handleSubmit } = useForm<IFilterData>();

  const onSubmit = (data: IFilterData) => {
    setFilterData(data);

    handleToggleFilter();
  };

  const handleToggleFilter = () => {
    setToggleFilter((prevState) => !prevState);
  };

  return {
    toggleFilter,
    control,
    handleSubmit,
    onSubmit,
    handleToggleFilter,
  };
};
