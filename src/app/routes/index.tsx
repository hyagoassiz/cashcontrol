import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  LoginRoute,
  CadastroRoute,
  CategoriasRoute,
  ContasRoute,
  TransacoesRoute,
  SaldosRoute,
  VerificacaoRoute,
  InicioRoute,
} from "../pages/index";
import * as PATHS from "./paths";
import { ReactNode } from "react";
import Private from "./Private";
import AppDrawer from "../shared/components/AppDrawer/AppDrawer";
import { PageLayout } from "../shared/layouts/PageLayout";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <>
    <PageLayout>{children}</PageLayout>
  </>
);

export const AppRoutes = () => {
  return (
    <BrowserRouter basename="/cashcontrol">
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
            <AppDrawer>
              <Layout>
                <Routes>
                  <Route
                    path={PATHS.INICIO.LIST}
                    element={
                      <Private>
                        <InicioRoute />
                      </Private>
                    }
                  />
                  <Route
                    path={PATHS.TRANSACOES.LIST}
                    element={
                      <Private>
                        <TransacoesRoute />
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
                  <Route
                    path="*"
                    element={<Navigate to={PATHS.TRANSACOES.LIST} />}
                  />
                </Routes>
              </Layout>
            </AppDrawer>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
