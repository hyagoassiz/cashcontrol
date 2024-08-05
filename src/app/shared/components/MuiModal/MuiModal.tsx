import { Box, BoxProps, Modal, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface IMuiModalProps {
  title: string;
  open: boolean;
  children: ReactNode;
  buttons?: ReactNode;
  style: BoxProps;
}

export const MuiModal: React.FC<IMuiModalProps> = ({
  title,
  open,
  children,
  buttons,
  style,
}) => {
  const theme = useTheme();

  return (
    <>
      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: theme.palette.primary.dark,
            boxShadow: 24,
            p: 4,
            borderRadius: theme.spacing(2),
            padding: theme.spacing(3),
            ...style,
          }}
        >
          <Typography
            sx={{ fontWeight: 600, color: theme.palette.text.primary }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            {children}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5 }}>
            {buttons}
          </Box>
        </Box>
      </Modal>
    </>
  );
};
