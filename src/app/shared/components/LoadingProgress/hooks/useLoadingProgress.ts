import { useSelector } from "react-redux";
import { RootState } from "../../../redux/interfaces/IRedux";
import { ILoading } from "../../../redux/interfaces";

interface IUseLoadingProgress {
  loading: ILoading;
}

export const useLoadingProgress = (): IUseLoadingProgress => {
  const loading = useSelector((state: RootState) => state.loading);

  return { loading };
};
