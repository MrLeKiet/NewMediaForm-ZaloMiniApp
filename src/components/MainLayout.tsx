import React from "react";
import Navbar from "./NavBar";
import Header from "./Header"

export type MainLayoutProps = {
    children: React.ReactNode;
    showNavbar?: boolean;
    showHeader?: boolean;
};

const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    showNavbar = true,
    showHeader = true,
}) => (
    <div className="min-h-screen flex flex-col" style={{ padding: 0 }}>
        <div style={{ position: "sticky", top: 0, zIndex: 50 }}>
            {showHeader && <Header />}
        </div>
        <div
            className="flex-1 flex flex-col gap-4 overflow-y-auto"
            style={{
                maxHeight:
                    "calc(100vh - var(--safe-top) - var(--navbar-height) - var(--header-height) + 10px)",
            }}
        >
            {children}
        </div>
        {showNavbar && (
            <div style={{ position: "sticky", bottom: 0, zIndex: 50 }}>
                <Navbar />
            </div>
        )}
    </div>
);

export default MainLayout;
