import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import WelcomePage from "../pages/WelcomePage";
import SignupUser from "../pages/signup/SignupUserPage";
import UserTypeSelectionPage from "../pages/UserTypeSelectionPage";
import LoginUser from "../pages/login/LoginUserPage";
import SignupOrgPage from "../pages/signup/SignupOrgPage";
import LoginOrgPage from "../pages/login/LoginOrgPage";

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoadingPage />} />
                <Route path='/welcome' element={<WelcomePage />} />
                <Route path='/user-type' element={<UserTypeSelectionPage />} />
                <Route path='/cadastro/organizacao' element={<SignupOrgPage />} />
                <Route path='/cadastro/usuario' element={<SignupUser />} />
                <Route path='/login/organizacao' element={<LoginOrgPage />} />
                <Route path='/login/usuario' element={<LoginUser />} />
            </Routes>
        </BrowserRouter>
    )
}