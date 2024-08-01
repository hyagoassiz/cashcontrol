import { useSelector } from "react-redux";
import { RootState } from "../../../redux/interfaces/IRedux";
import { IUsuario } from "../../../interfaces";

interface IUseAppDrawer {
  user: IUsuario;
}

export const useAppDrawer = (): IUseAppDrawer => {
  const user = useSelector((state: RootState) => state.user);

  return { user };
};
