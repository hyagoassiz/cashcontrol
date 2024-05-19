import "../App.css";
import { AppRoutes } from "./routes";
import { MuiCircularProgress } from "./shared/components/MuiCircularProgress/MuiCircularProgress";
import { ProgressProvider } from "./shared/contexts/ProgressContext";

const App: React.FC = () => {
  return (
    <>
      <ProgressProvider>
        <AppRoutes />
        <MuiCircularProgress />
      </ProgressProvider>
    </>
  );
};

export default App;
