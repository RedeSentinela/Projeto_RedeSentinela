import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import WelcomePage from "../pages/WelcomePage";
import SignupUser from "../pages/signup/SignupUser";
import UserTypeSelectionPage from "../pages/UserTypeSelectionPage";
import LoginUser from "../pages/login/LoginUser";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoadingPage />} />
                <Route path='/welcome' element={<WelcomePage />} />
                <Route path='/user-type' element={<UserTypeSelectionPage />} />
                <Route path='/cadastro/usuario' element={<SignupUser />} />
                <Route path='/login/usuario' element={<LoginUser />} />
            </Routes>
        </BrowserRouter>
    )
}