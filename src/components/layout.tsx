import { getSystemInfo } from "zmp-sdk";
import {
  AnimationRoutes,
  App,
  Route,
  SnackbarProvider,
  ZMPRouter,
} from "zmp-ui";
import { AppProps } from "zmp-ui/app";

import JobDetailPage from "@/pages/detail";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import EnterprisePage from "@/pages/enterprise";
import ProfilePage from "@/pages/profile";
import NewsPage from "@/pages/news";
const Layout = () => {
  return (
    <App theme={getSystemInfo().zaloTheme as AppProps["theme"]}>
      <SnackbarProvider>
        <ZMPRouter>
          <AnimationRoutes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/enterprise" element={<EnterprisePage />} />
            <Route path="/detail/:id" element={<JobDetailPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </AnimationRoutes>
        </ZMPRouter>
        {/* Add Navbar at the bottom */}
      </SnackbarProvider>
    </App>
  );
};
export default Layout;
