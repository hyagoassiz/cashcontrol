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
      {open && (
        <Box
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1300,
          }}
          onClick={(e) => e.stopPropagation()}
        />
      )}
      <Modal
        open={open}
        keepMounted
        sx={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            ...style,
          }}
        >
          <Box
            sx={{
              bgcolor: "#1976D2",
              color: "white",
              padding: theme.spacing(1),
            }}
          >
            <Typography variant="h6" sx={{ marginLeft: "8px" }}>
              {title}
            </Typography>
          </Box>
          <Box sx={{ padding: theme.spacing(3) }}>{children}</Box>
          {buttons && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: theme.spacing(4),
                backgroundColor: "#EBEBEB",
                padding: theme.spacing(1),
              }}
            >
              {buttons}
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};
