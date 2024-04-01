import { Box } from "@mui/material";

interface ILayoutLogin {
  children: React.ReactNode;
}

export const LayoutLogin: React.FC<ILayoutLogin> = ({ children }) => {
  return (
    <Box
      height="100vh" // 100% da altura da viewport
      width="100vw" // 100% da largura da viewport
      display="flex"
      flexDirection="column"
      justifyContent="center" // Centraliza verticalmente
      alignItems="center" // Centraliza horizontalment
    >
      {children}
    </Box>
  );
};
