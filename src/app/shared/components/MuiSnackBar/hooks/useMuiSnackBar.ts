import { useDispatch, useSelector } from "react-redux";
import { IUseSelector } from "../../../interfaces/IUseSelector";
import SnackBarActionTypes from "../../../redux/snackBar/action-types";
import { useEffect } from "react";

interface IUseMuiSnackBar {
  snackBar: IUseSelector;
  handleClose: () => void;
}

export const useMuiSnackBar = (): IUseMuiSnackBar => {
  const dispatch = useDispatch();
  const snackBar = useSelector((rootReducer) => rootReducer.snackBarReducer);

  useEffect(() => {
    if (snackBar.snackbar.open) {
      setTimeout(() => {
        handleClose();
      }, 4000);

      return () => handleClose();
    }
  });

  const handleClose = () => {
    dispatch({ type: SnackBarActionTypes.SNACKBAR.HIDE });
  };

  return { snackBar, handleClose };
};
