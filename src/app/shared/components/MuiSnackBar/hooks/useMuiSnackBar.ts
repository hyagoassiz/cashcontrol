import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../../redux/interfaces/IRedux";
import { ISnackBar } from "../../../interfaces/ISnackBar";
import { closeSnackbar } from "../../../redux/snackBar/actions";

interface IUseMuiSnackBar {
  snackBar: ISnackBar;
  handleClose: () => void;
}

export const useMuiSnackBar = (): IUseMuiSnackBar => {
  const dispatch = useDispatch();
  const snackBar = useSelector((state: RootState) => state.snackBar);

  useEffect(() => {
    if (snackBar.open) {
      setTimeout(() => {
        handleClose();
      }, 3000);

      return () => handleClose();
    }
  });

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return { snackBar, handleClose };
};
