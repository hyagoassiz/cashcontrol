import { Alert, Snackbar } from "@mui/material";
import { useMuiSnackBar } from "./hooks/useMuiSnackBar";

const MuiSnackBar: React.FC = () => {
  const { snackBar, handleClose } = useMuiSnackBar();

  return (
    <>
      <Snackbar
        open={snackBar.open}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ marginTop: "55px" }}
      >
        <Alert
          severity={`${snackBar.type}`}
          variant="filled"
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MuiSnackBar;
