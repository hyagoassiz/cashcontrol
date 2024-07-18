import { ThemeProvider } from "@mui/material";
import "../App.css";
import { AppRoutes } from "./routes";
import { MuiCircularProgress } from "./shared/components/MuiCircularProgress/MuiCircularProgress";
import {
  GlobalContextProvider,
  ProgressProvider,
} from "./shared/contexts/index";
import { DarkTheme } from "./shared/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={DarkTheme}>
          <GlobalContextProvider>
            <ProgressProvider>
              <AppRoutes />
              <MuiCircularProgress />
            </ProgressProvider>
          </GlobalContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
