

import { useEffect } from "react";
import { getAccessToken, getPhoneNumber, getUserInfo, getUserID } from "zmp-sdk/apis";
import { useNavigate } from "zmp-ui";

const AuthPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuthorize = async () => {
            try {
                const phoneToken = await getPhoneNumber();
                const accessToken = await getAccessToken();
                const userID = await getUserID();
                const userInfo = await getUserInfo({ autoRequestPermission: true });
                // Debug log
                console.log("Accesstoken:", accessToken);
                console.log("Code:", phoneToken);
                console.log("ZaloId:", userID);
                // Try to login via API
                const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/SignIn`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Accept-Language": "2"
                    },
                    body: JSON.stringify({
                        Accesstoken: accessToken || "",
                        Code: phoneToken.token || "",
                        ZaloId: userID || ""
                    })
                });
                const data = await res.json();
                if (data.StatusResult?.Code === 0) {
                    // Login success
                    navigate("/home");
                } else {
                    // Not registered, go to register
                    navigate("/register", { state: { userInfo } });
                }
            } catch (err) {
                console.error("Authorization error:", err);
                location.reload();
            }
        };
        checkAuthorize();
    }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-teal-700 relative">
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
                <div className="text-white text-xl font-bold">Loading...</div>
            </div>
        </div>
    );
};

export default AuthPage;
