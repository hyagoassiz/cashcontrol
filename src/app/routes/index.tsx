import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  CategoriasRoute,
  ContasRoute,
  ListagemMenuRoute,
  MovimentacoesRoute,
} from "../pages/index";
import * as PATHS from "./paths";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.MENU.LIST} element={<ListagemMenuRoute />} />
        <Route
          path={PATHS.ENTRADAS_SAIDAS.LIST}
          element={<MovimentacoesRoute />}
        />
        <Route path={PATHS.CATEGORIAS.LIST} element={<CategoriasRoute />} />
        <Route path={PATHS.CONTAS.LIST} element={<ContasRoute />} />
        <Route path="*" element={<Navigate to={PATHS.MENU.LIST} />} />
      </Routes>
    </BrowserRouter>
  );
};
