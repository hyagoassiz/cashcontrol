import SnackBarActionTypes from "./action-types";

export const showSnackbar = (message: string, type = "success") => ({
  type: SnackBarActionTypes.SNACKBAR.SHOW,
  payload: { message, type },
});
