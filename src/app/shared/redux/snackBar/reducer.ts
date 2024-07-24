import { IUseSelector } from "../../interfaces/IUseSelector";
import SnackBarActionTypes from "./action-types";

const initialState: IUseSelector = {
  snackbar: {
    message: "",
    type: "success",
    open: false,
  },
};
interface SnackBarAction {
  type: string;
  payload?: {
    message: string;
    type: "error" | "info" | "success" | "warning";
  };
}

const snackBarReducer = (state = initialState, action: SnackBarAction): IUseSelector => {
  switch (action.type) {
    case SnackBarActionTypes.SNACKBAR.HIDE:
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          open: false,
        },
      };
    case SnackBarActionTypes.SNACKBAR.SHOW:
      return {
        ...state,
        snackbar: {
          message: action.payload?.message ?? "",
          type: action.payload?.type ?? "success",
          open: true,
        },
      };
    default:
      return state;
  }
};

export default snackBarReducer;
