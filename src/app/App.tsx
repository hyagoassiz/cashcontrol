import "../App.css";
import { AppRoutes } from "./routes";
import MuiSnackBar from "./shared/components/MuiSnackBar";
import { GlobalContextProvider } from "./shared/contexts/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalContextProvider>
          <AppRoutes />
        </GlobalContextProvider>
      </QueryClientProvider>
      <MuiSnackBar />
    </>
  );
};

export default App;
