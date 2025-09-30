import React from "react";
import { useLocation } from "zmp-ui";
import Header from "../components/Header";
import Navbar from "../components/NavBar";
import ReturnHeader from "../components/ReturnHeader";

// Define your main and return routes here
const MAIN_ROUTES = [
    "/",
    "/home",
    "/news",
    "/profile",
    "/enterprise"
];
const RETURN_ROUTES = [
    "/jobdetails",
    "/register",
    "/auth",
    "/profile/edit"
];


type NavbarVisibilityContextType = {
    showNavbar: boolean;
    setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavbarVisibilityContext = React.createContext<NavbarVisibilityContextType | undefined>(undefined);

type MainLayoutProps = {
    children: React.ReactNode;
};


const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const location = useLocation();
    const path = location.pathname;
    const [showNavbar, setShowNavbar] = React.useState(true);

    if (!MAIN_ROUTES.includes(path) && !RETURN_ROUTES.includes(path)) {
        // No layout for routes not listed
        return <>{children}</>;
    }

    const isMain = MAIN_ROUTES.includes(path);

    return (
        <NavbarVisibilityContext.Provider value={{ showNavbar, setShowNavbar }}>
            <div className="min-h-screen flex flex-col" style={{ padding: 0 }}>
                <div style={{ position: "sticky", top: 0, zIndex: 50 }}>
                    {isMain ? <Header /> : <ReturnHeader />}
                </div>
                <div
                    className="flex-1 flex flex-col px-1 pb-1 gap-4 overflow-y-auto"
                    style={{
                        maxHeight: isMain
                            ? "calc(100vh - var(--safe-top) - var(--navbar-height) - var(--header-height) + 10px)"
                            : "calc(100vh - var(--safe-top) - var(--return-header-height) + 10px)",
                    }}
                >
                    {children}
                </div>
                {isMain && showNavbar && (
                    <div style={{ position: "sticky", bottom: 0, zIndex: 50 }}>
                        <Navbar />
                    </div>
                )}
            </div>
        </NavbarVisibilityContext.Provider>
    );
};

export default MainLayout;
