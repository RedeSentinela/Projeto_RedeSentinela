// Página molde para todas as páginas que usam a navbar

import { Outlet } from 'react-router-dom'
import BottomNavbar from './BottomNavbar'

export default function AppLayout() {
    return (
        <div className="app-layout">
            <Outlet />
            <BottomNavbar />
        </div>
    )
}