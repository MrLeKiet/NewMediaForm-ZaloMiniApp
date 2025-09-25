
import { Page } from "zmp-ui";
import Navbar from "../../components/NavBar";
import RegisterPage from "../register";
import { User } from "lucide-react";
function ProfilePage() {
    return (
        <Page className="bg-[#f4f4f4] min-h-screen flex flex-col" style={{ paddingTop: 'var(--safe-top)', paddingBottom: 'var(--safe-bottom)' }}>
            <div className="relative flex items-center rounded-b-2xl px-4 py-6 mb-4 shadow-sm" style={{ background: "linear-gradient(90deg, #E6F4FF 60%, #fff 100%)" }}>
                <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white flex items-center justify-center bg-gray-200 shadow-lg">
                        <User size={16} className="text-gray-400" />
                    </div>
                </div>
                <div className="flex-1 ml-4">
                    <div className="text-lg font-semibold">Nguyễn Văn A</div>
                </div>
            </div>
            
            <Navbar />
        </Page>
    );
}


export default ProfilePage;