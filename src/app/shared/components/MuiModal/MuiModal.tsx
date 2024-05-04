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
  const theme = useTheme();

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
          position: "absolute",
          top: "50%",
          left: "50%",
          width: theme.spacing(60),
          height: theme.spacing(35),
          transform: "translate(-50%, -50%)",
          boxShadow: "none",
          outline: "none",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            width="100%"
            height={theme.spacing(6.1)}
            bgcolor={"#1976D2"}
            alignItems="center"
            marginBottom={theme.spacing(0.8)}
            display="flex"
          >
            <Typography
              variant="h6"
              color="white"
              sx={{
                marginLeft: theme.spacing(2),
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              padding: theme.spacing(2),
              marginBottom: 1,
            }}
          >
            {children}
          </Box>
          <Box
            width="100%"
            height={theme.spacing(6.6)}
            bgcolor={"#F0F0F0"}
            alignItems="center"
            display="flex"
            justifyContent="flex-end"
          >
            {buttons && (
              <Box sx={{ marginRight: theme.spacing(2) }}>{buttons}</Box>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};
