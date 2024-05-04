import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ReactNode } from "react";

interface IMuiDialog {
  open: boolean;
  title: string;
  message: string;
  buttons: ReactNode;
}

const MuiDialog = ({ open, title, message, buttons }: IMuiDialog) => {
  return (
    <>
      <Dialog open={open}>
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>{buttons}</DialogActions>
      </Dialog>
    </>
  );
};

export default MuiDialog;
