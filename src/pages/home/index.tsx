



import Navbar from "@/components/NavBar";
import React from "react";
import { Page } from "zmp-ui";
import HomeFilters from "./HomeFilters";
import HomeHeader from "./HomeHeader";
import HomeSlider from "./HomeSlider";
import HotNewsSection from "./HotNewsSection";
import JobListSection from "./JobListSection";
import LaboreSection from "./LaboreSection";

const HomePage = () => {
  const [showNavbar, setShowNavbar] = React.useState(true);
  // No need for global loading state; each section handles its own skeleton

  return (
    <Page className="bg-white" style={{ paddingBottom: 'calc(20px + var(--navbar-height))' }}>
      <HomeHeader />
      <div className="flex flex-col gap-4">
        <HomeSlider />
        <HomeFilters setShowNavbar={setShowNavbar} />
        <HotNewsSection />
        <JobListSection />
        <LaboreSection />
      </div>
      {showNavbar && <Navbar />}
    </Page>
  );
};

export default HomePage;