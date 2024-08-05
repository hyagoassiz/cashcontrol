import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  CategoriasRoute,
  ContasRoute,
  ListagemMenuRoute,
  MovimentacoesRoute,
  SaldosRoute,
} from "../pages/index";
import * as PATHS from "./paths";
import { ReactNode } from "react";
import { MuiAppBar } from "../shared/components/MuiAppBar/AppBar";

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
  return (
    <BrowserRouter>
      <Routes>
        {/* Adicionar aqui as rotas que não renderizarão o appbar */}
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path={PATHS.MENU.LIST} element={<ListagemMenuRoute />} />
                <Route
                  path={PATHS.ENTRADAS_SAIDAS.LIST}
                  element={<MovimentacoesRoute />}
                />
                <Route path={PATHS.SALDOS.LIST} element={<SaldosRoute />} />
                <Route
                  path={PATHS.CATEGORIAS.LIST}
                  element={<CategoriasRoute />}
                />
                <Route path={PATHS.CONTAS.LIST} element={<ContasRoute />} />
                <Route path="*" element={<Navigate to={PATHS.MENU.LIST} />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
