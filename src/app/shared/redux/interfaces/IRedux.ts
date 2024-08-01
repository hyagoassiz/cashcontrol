import { IUsuario } from "../../interfaces";
import { ISnackBar } from "../../interfaces/ISnackBar";
import { ILoading } from "../../interfaces/ILoading";

export interface RootState {
  user: IUsuario;
  snackBar: ISnackBar;
  loading: ILoading;
}
