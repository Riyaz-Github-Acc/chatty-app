import './App.css'

import { Loader } from "lucide-react"
import { Navigate, Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar"
import { useAuthenticatedUser } from "./hooks/useAuthHook"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"
import Signup from "./pages/Signup"
import { useThemeStore } from "./store/useThemeStore"

const App = () => {
    const { theme } = useThemeStore();
    const { authenticatedUser, isAuthLoading } = useAuthenticatedUser();

    if (isAuthLoading) {
        return (
            <div className="flex items-center justify-center h-screen" data-theme={theme}>
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }

    return (
        <div data-theme={theme}>
            <Navbar />

            <Routes>
                <Route path="/" element={authenticatedUser ? <Home /> : <Navigate to={'/login'} />} />
                <Route path="/profile" element={authenticatedUser ? <Profile /> : <Navigate to={'/login'} />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={!authenticatedUser ? <Login /> : <Navigate to={'/'} />} />
                <Route path="/signup" element={!authenticatedUser ? <Signup /> : <Navigate to={'/'} />} />
            </Routes>
        </div>
    )
}

export default App