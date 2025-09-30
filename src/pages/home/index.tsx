




import React from "react";
import MainLayout from "@/components/MainLayout";
import HomeFilters from "./HomeFilters";
import HomeSlider from "./HomeSlider";
import HotNewsSection from "./HotNewsSection";
import JobListSection from "./JobListSection";
import LaboreSection from "./LaboreSection";


const HomePage = () => {
  const [showNavbar, setShowNavbar] = React.useState(true);
  const [showHeader] = React.useState(true);
  return (
    <MainLayout showNavbar={showNavbar} showHeader={showHeader}>
      <HomeSlider />
      <HomeFilters setShowNavbar={setShowNavbar} />
      <HotNewsSection />
      <JobListSection />
      <LaboreSection />
    </MainLayout>
  );
};

export default HomePage;