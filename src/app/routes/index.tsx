import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login, Dashboard } from '../pages';
 

export const AppRoutes =  () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/inicio" element={<Dashboard/>} />
                <Route path="*" element={<Navigate to='/inicio'/>} />
            </Routes>
        </BrowserRouter>
    );
}