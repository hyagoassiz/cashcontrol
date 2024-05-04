import { ReactNode, createContext, useState } from "react";
import { ICategoria } from "../interfaces";

interface IFilterContextProps {
  children: ReactNode;
}

interface IFilterContextData {
  isOpenFilter: boolean;
  setIsOpenFilter: (setIsOpenFilter: boolean) => void;
  isOpenDialog: boolean;
  setIsOpenDialog: (setIsOpenDialog: boolean) => void;
  activateDeactivateData: ICategoria | null;
  setActivateDeactivateData: (setActivateDeactivateData: ICategoria) => void;
  situacao: boolean[];
  setSituacao: (setSituacao: boolean[]) => void;
  isOpenAddModalCategoria: boolean
  setIsOpenAddModalCategoria: (setIsOpenAddModalCategoria: boolean) => void
}

export const FilterContext = createContext({} as IFilterContextData);

export function FilterProvider({ children }: IFilterContextProps): JSX.Element {

  const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const [activateDeactivateData, setActivateDeactivateData] =
    useState<ICategoria | null>(null);

  const [situacao, setSituacao] = useState<boolean[]>([true]);

  const [isOpenAddModalCategoria, setIsOpenAddModalCategoria] =
  useState<boolean>(false);


  return (
    <FilterContext.Provider
      value={{
        isOpenFilter,
        setIsOpenFilter,
        isOpenDialog,
        setIsOpenDialog,
        activateDeactivateData,
        situacao,
        setSituacao,
        setActivateDeactivateData,
        isOpenAddModalCategoria,
        setIsOpenAddModalCategoria
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
