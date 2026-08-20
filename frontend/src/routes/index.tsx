import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import WelcomePage from "../pages/WelcomePage";
import SignupUser from "../pages/signup/SignupUserPage";
import UserTypeSelectionPage from "../pages/UserTypeSelectionPage";
import LoginUser from "../pages/login/LoginUserPage";
import SignupOrgPage from "../pages/signup/SignupOrgPage";
import LoginOrgPage from "../pages/login/LoginOrgPage";
import AppLayout from "../components/layout/AppLayout";
import BuscarAjudaPage from "../pages/BuscarAjudaPage";

export function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>
                
                {/* Rotas SEM navbar (fluxo de autenticação) */}
                <Route path='/' element={<LoadingPage />} />
                <Route path='/welcome' element={<WelcomePage />} />
                <Route path='/user-type' element={<UserTypeSelectionPage />} />
                <Route path='/cadastro/organizacao' element={<SignupOrgPage />} />
                <Route path='/cadastro/usuario' element={<SignupUser />} />
                <Route path='/login/organizacao' element={<LoginOrgPage />} />
                <Route path='/login/usuario' element={<LoginUser />} />

                {/* Rotas COM navbar, estão agrupadas dentro do AppLayout.tsx */}
                <Route element={<AppLayout />}>
                    {/*<Route path='/home' element={<HomePage />}/>*/}
                    <Route path='/busca' element={<BuscarAjudaPage />} />
                    {/*<Route path='/denuncia' element={<DenunciaPage />}/>*/}
                    {/*<Route path='/perfil' element={<PerfilPage />}/>*/}
                </Route>

            </Routes>

        </BrowserRouter>
    )
}