import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login, Dashboard } from '../pages';
import Private from "./Private";
import * as PATHS from './paths';
 

export const AppRoutes =  () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path={PATHS.LOGIN.LIST} element={<Login/>} />
                <Route path={PATHS.DASHBOARD.LIST} element={<Private><Dashboard/></Private>} />
                <Route path="*" element={<Navigate to={PATHS.DASHBOARD.LIST}/>} />
            </Routes>
        </BrowserRouter>
    );
}