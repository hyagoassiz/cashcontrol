import { IUsuario } from "../../interfaces";
import { ISnackBar } from "../../interfaces/ISnackBar";

export interface RootState {
  user: IUsuario;
  snackBar: ISnackBar;
}
