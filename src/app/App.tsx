import "../App.css";
import { AppRoutes } from "./routes";
import { MuiCircularProgress } from "./shared/components/MuiCircularProgress/MuiCircularProgress";
import { GlobalProvider } from "./shared/contexts";
import { ProgressProvider } from "./shared/contexts/ProgressContext";

const App: React.FC = () => {
  return (
    <>
      <GlobalProvider>
        <ProgressProvider>
          <AppRoutes />
          <MuiCircularProgress />
        </ProgressProvider>
      </GlobalProvider>
    </>
  );
};

export default App;
