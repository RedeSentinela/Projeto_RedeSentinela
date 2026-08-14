import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import WelcomePage from "../pages/WelcomePage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoadingPage />} />
                <Route path='/welcome' element={<WelcomePage />} />
                <Route path='/cadastro' element={<SignupPage />} />
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    )
}