import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  LoginRoute,
  CadastroRoute,
  CategoriasRoute,
  ContasRoute,
  ListagemMenuRoute,
  MovimentacoesRoute,
  SaldosRoute,
  VerificacaoRoute,
} from "../pages/index";
import * as PATHS from "./paths";
import { ReactNode } from "react";
import { MuiAppBar } from "../shared/components/MuiAppBar/AppBar";
import Private from "./Private";
import { Box, useTheme } from "@mui/material";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <MuiAppBar />
    {children}
  </>
);

export const AppRoutes = () => {
  const theme = useTheme();

  return (
    <BrowserRouter>
      <Box
        width="100vw"
        height="100vh"
        bgcolor={theme.palette.background.default}
      >
        <Routes>
          <Route path={PATHS.AUTENTICACAO.LOGIN} element={<LoginRoute />} />
          <Route path={PATHS.AUTENTICACAO.CREATE} element={<CadastroRoute />} />
          <Route
            path={PATHS.AUTENTICACAO.CHECK}
            element={
              <Private>
                <VerificacaoRoute />
              </Private>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route
                    path={PATHS.MENU.LIST}
                    element={
                      <Private>
                        <ListagemMenuRoute />
                      </Private>
                    }
                  />
                  <Route
                    path={PATHS.ENTRADAS_SAIDAS.LIST}
                    element={
                      <Private>
                        <MovimentacoesRoute />
                      </Private>
                    }
                  />
                  <Route
                    path={PATHS.SALDOS.LIST}
                    element={
                      <Private>
                        <SaldosRoute />
                      </Private>
                    }
                  />
                  <Route
                    path={PATHS.CATEGORIAS.LIST}
                    element={
                      <Private>
                        <CategoriasRoute />
                      </Private>
                    }
                  />
                  <Route
                    path={PATHS.CONTAS.LIST}
                    element={
                      <Private>
                        <ContasRoute />
                      </Private>
                    }
                  />
                  <Route path="*" element={<Navigate to={PATHS.MENU.LIST} />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};
