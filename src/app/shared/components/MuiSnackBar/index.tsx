import { Alert, Snackbar } from "@mui/material";
import { useMuiSnackBar } from "./hooks/useMuiSnackBar";

const MuiSnackBar: React.FC = () => {
  const { snackBar, handleClose } = useMuiSnackBar();
  return (
    <>
      <Snackbar open={snackBar.snackbar.open}>
        <Alert
          severity={`${snackBar.snackbar.type}`}
          variant="filled"
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          {snackBar.snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MuiSnackBar;
