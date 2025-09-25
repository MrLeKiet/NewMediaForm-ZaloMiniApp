import { Briefcase, Edit, Newspaper, User } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "zmp-ui";

const NAV_ITEMS = [
    { label: "Tìm việc", icon: <Briefcase size={24} />, path: "/home" },
    { label: "Đăng tuyển", icon: <Edit size={24} />, path: "/enterprise" },
    { label: "Tin tức", icon: <Newspaper size={24} />, path: "/news" },
    { label: "Tài khoản", icon: <User size={24} />, path: "/profile" },
];

const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white shadow z-50 flex justify-around items-center h-16 border-t">
            {NAV_ITEMS.map((item) => {
                const isActive = currentPath === item.path;
                return (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className="flex flex-col items-center justify-center flex-1 h-full focus:outline-none relative"
                    >
                        <span className={isActive ? "text-blue-600" : "text-gray-400"}>{item.icon}</span>
                        <span className={`text-xs mt-1 ${isActive ? "text-blue-600 font-semibold" : "text-gray-500"}`}>{item.label}</span>
                        {isActive && (
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-t" />
                        )}
                    </button>
                );
            })}
        </nav>
    );
};

export default Navbar;
