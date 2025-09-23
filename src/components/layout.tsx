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
import AuthPage from "@/pages/auth";
import RegisterPage from "@/pages/register";
import LoginPage from "@/pages/login";
const Layout = () => {
  return (
    <App theme={getSystemInfo().zaloTheme as AppProps["theme"]}>
      <SnackbarProvider>
        <ZMPRouter>
          <AnimationRoutes>
            <Route path="/" element={<AuthPage/>} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/detail/:id" element={<JobDetailPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </AnimationRoutes>
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};
export default Layout;
