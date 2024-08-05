import "../App.css";
import { AppRoutes } from "./routes";
import MuiSnackBar from "./shared/components/MuiSnackBar";
import { GlobalContextProvider } from "./shared/contexts/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
import { DarkTheme } from "./shared/themes";

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={DarkTheme}>
      {/* <CssBaseline /> */}
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <AppRoutes />
        </GlobalContextProvider>
      </QueryClientProvider>
      <MuiSnackBar />
    </ThemeProvider>
  );
};

export default App;
