import "../App.css";
import { AppRoutes } from "./routes";
import { MuiCircularProgress } from "./shared/components/MuiCircularProgress/MuiCircularProgress";
import MuiSnackBar from "./shared/components/MuiSnackBar";
import {
  GlobalContextProvider,
  ProgressProvider,
} from "./shared/contexts/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
          <GlobalContextProvider>
            <ProgressProvider>
              <AppRoutes />
              <MuiCircularProgress />
            </ProgressProvider>
          </GlobalContextProvider>
      </QueryClientProvider>
      <MuiSnackBar/>
    </>
  );
};

export default App;
