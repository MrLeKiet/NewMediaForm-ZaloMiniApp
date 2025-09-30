import { getSystemInfo } from "zmp-sdk";
import {
  AnimationRoutes,
  App,
  Route,
  SnackbarProvider,
  ZMPRouter,
} from "zmp-ui";
import { AppProps } from "zmp-ui/app";

import JobDetailPage from "@/pages/RecruitmentForeignersJobDetail";
import EnterprisePage from "@/pages/RecruitmentForeigners";
import HomePage from "@/pages/Home";
import NewsPage from "@/pages/HotNewsHomePage";
import ProfilePage from "@/pages/Profile";
import RegisterPage from "@/pages/Register";
import NewsDetailPage from "@/pages/NewDetail";
import JobsDetailPage from "@/pages/JobDetails";
const Layout = () => {
  return (
    <App theme={getSystemInfo().zaloTheme as AppProps["theme"]}>
      <SnackbarProvider>
        <ZMPRouter>
          <AnimationRoutes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/news" element={<NewsPage/>} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/jobsdetail/:id" element={<JobsDetailPage />} />
            <Route path="/enterprise" element={<EnterprisePage />} />
            <Route path="/detail/:id" element={<JobDetailPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </AnimationRoutes>
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};
export default Layout;
