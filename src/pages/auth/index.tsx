

import { useEffect } from "react";
import { getAccessToken, getPhoneNumber, getUserInfo } from "zmp-sdk/apis";
import { useNavigate } from "zmp-ui";

const AuthPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthorize = async () => {
            
            try {
                const phoneToken = await getPhoneNumber();
                const accessToken = await getAccessToken();
                const userInfo = await getUserInfo({ autoRequestPermission: true });
                console.log("Token:", phoneToken.token);
                console.log("AccessToken:", accessToken);
                console.log("UserInfo:", userInfo);
                navigate("/register", { state: { userInfo } });
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
