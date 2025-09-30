




import MainLayout from "@/layouts/MainLayout";
import HomeFilters from "./HomeFilters";
import HomeSlider from "./HomeSlider";
import HotNewsSection from "./HotNewsSection";
import JobListSection from "./JobListSection";
import LaboreSection from "./LaboreSection";



const HomePage = () => {
  return (
    <MainLayout>
      <HomeSlider />
      <HomeFilters />
      <HotNewsSection />
      <JobListSection />
      <LaboreSection />
    </MainLayout>
  );
};

export default HomePage;