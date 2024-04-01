// import { ThemeProvider } from "@emotion/react";
import "../App.css";
import { AppRoutes } from "./routes";
// import { DarkTheme } from './shared/themes';

function App() {
  return (
    <>
      {/* <ThemeProvider theme={DarkTheme}> */}
        <AppRoutes />
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
