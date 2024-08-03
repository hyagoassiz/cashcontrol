import { Box } from "@mui/material";
import { LoadingProgress } from "../components/LoadingProgress/LoadingProgress";
import { MuiAppBar } from "../components/MuiAppBar/AppBar";

interface IPageLayout {
  children: React.ReactNode;
}

export const PageLayout: React.FC<IPageLayout> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#141A28",
      }}
    >
      <MuiAppBar />

      <Box
        sx={{
          flexGrow: 1,
          paddingTop: (theme) => theme.spacing(3),
          width: "95%",
          margin: "0 auto",
          overflowY: "auto",
        }}
      >
        <LoadingProgress />

        {children}
      </Box>
    </Box>
  );
};
