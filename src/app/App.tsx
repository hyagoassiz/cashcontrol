import "../App.css";
import { AppRoutes } from "./routes";
import { MuiCircularProgress } from "./shared/components/MuiCircularProgress/MuiCircularProgress";
import {
  GlobalContextProvider,
  ProgressProvider,
} from "./shared/contexts/index";

const App: React.FC = () => {
  return (
    <>
      <GlobalContextProvider>
        <ProgressProvider>
          <AppRoutes />
          <MuiCircularProgress />
        </ProgressProvider>
      </GlobalContextProvider>
    </>
  );
};

export default App;
