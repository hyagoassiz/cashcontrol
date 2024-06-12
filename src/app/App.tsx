import { ThemeProvider } from "@mui/material";
import "../App.css";
import { AppRoutes } from "./routes";
import { MuiCircularProgress } from "./shared/components/MuiCircularProgress/MuiCircularProgress";
import {
  GlobalContextProvider,
  ProgressProvider,
} from "./shared/contexts/index";
import { DarkTheme } from "./shared/themes";

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={DarkTheme}>
        <GlobalContextProvider>
          <ProgressProvider>
            <AppRoutes />
            <MuiCircularProgress />
          </ProgressProvider>
        </GlobalContextProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
