import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CategoriasRoute, ContasRoute } from '../pages/index';
import * as PATHS from './paths';
 

export const AppRoutes =  () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path={PATHS.CATEGORIAS.LIST} element={<CategoriasRoute/>} />
                <Route path={PATHS.CONTAS.LIST} element={<ContasRoute/>} />
                <Route path="*" element={<Navigate to={PATHS.CATEGORIAS.LIST}/>} />
            </Routes>
        </BrowserRouter>
    );
}