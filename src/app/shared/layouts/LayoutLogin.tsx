import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";


interface ILayoutLogin {
  children: React.ReactNode;
}

export const LayoutLogin: React.FC<ILayoutLogin> = ({ children }) => {
    const theme = useTheme();
  return (
    <Box
      height="100vh" // 100% da altura da viewport
      width="100vw" // 100% da largura da viewport
      display="flex"
      flexDirection="column"
      justifyContent="center" // Centraliza verticalmente
      alignItems="center" // Centraliza horizontalment
      sx={{
        bgcolor: theme.palette.primary.main // Usando a cor primária do tema
      }}
    >
      {children}
    </Box>
  );
};
