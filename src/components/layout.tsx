import { getSystemInfo } from "zmp-sdk";
import {
    AnimationRoutes,
    App,
    Route,
    SnackbarProvider,
    ZMPRouter,
} from "zmp-ui";
import { AppProps } from "zmp-ui/app";

import JobDetailPage from "@/pages/joblist/job-detail";
import JobListPage from "@/pages/joblist/job-list";

const Layout = () => {
  return (
    <App theme={getSystemInfo().zaloTheme as AppProps["theme"]}>
      <SnackbarProvider>
        <ZMPRouter>
          <AnimationRoutes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<JobListPage />} />
            <Route path="/job-detail" element={<JobDetailPage />} />
          </AnimationRoutes>
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  );
};
export default Layout;
