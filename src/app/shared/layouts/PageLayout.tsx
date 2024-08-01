import { Box } from "@mui/material";
import { LoadingProgress } from "../components/LoadingProgress/LoadingProgress";

interface IPageLayout {
  children: React.ReactNode;
}

export const PageLayout: React.FC<IPageLayout> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#141A28",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          marginTop: "16px",
          height: "auto",
          width: "95%",
        }}
      >
        <LoadingProgress />
        {children}
      </Box>
    </Box>
  );
};
