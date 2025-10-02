import HomeFilters from "./HomeFilters";
import HomeSlider from "./HomeSlider";
import HotNewsSection from "./HotNewsSection";
import JobListSection from "./JobListSection";
import LaborerSection from "./LaboreSection";


const HomePage = () => {
  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      <HomeSlider />
      <HomeFilters />
      <HotNewsSection />
      <JobListSection />
      <LaborerSection />
    </div>
  );
};

export default HomePage;