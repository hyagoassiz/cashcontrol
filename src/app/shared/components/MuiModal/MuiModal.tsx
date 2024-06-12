import { Box, Modal, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";
import CustomBoxHead from "./styles/CustomBoxHead";
import CustomBoxBody from "./styles/CustomBoxBody";

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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomBoxBody
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "400px",
            maxHeight: "500px",
            overflow: "auto",
          }}
        >
          <CustomBoxHead
            sx={{
              padding: theme.spacing(1),
            }}
          >
            <Typography variant="h6">{title}</Typography>
          </CustomBoxHead>
          <Box sx={{ padding: theme.spacing(3) }}>{children}</Box>
          {buttons && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: theme.spacing(4),
                backgroundColor: "transparent",
                padding: theme.spacing(1),
              }}
            >
              {buttons}
            </Box>
          )}
        </CustomBoxBody>
      </Modal>
    </>
  );
};
