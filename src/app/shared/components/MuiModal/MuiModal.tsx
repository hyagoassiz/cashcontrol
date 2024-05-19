import { Box, Modal, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface IMuiModalProps {
  title: string;
  open: boolean;
  children: ReactNode;
  buttons?: ReactNode;
}

export const MuiModal: React.FC<IMuiModalProps> = ({
  title,
  open,
  children,
  buttons,
}) => {
  const theme = useTheme()
  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Cor escura para a sobreposição
            zIndex: 1300, // Coloque um valor maior que o zIndex do modal
          }}
          onClick={(e) => e.stopPropagation()} // Impede a interação com os elementos abaixo da sobreposição
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
            maxWidth: "90%",
            maxHeight: "90%",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              bgcolor: "#1976D2",
              color: "white",
              padding: theme.spacing(1),
            }}
          >
            <Typography variant="h6">{title}</Typography>
          </Box>
          <Box sx={{ padding: theme.spacing(3) }}>{children}</Box>
          {buttons && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: theme.spacing(4),
                backgroundColor: '#EBEBEB',
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
