import HomeFilters from "./HomeFilters";
import HomeSlider from "./HomeSlider";
import HotNewsSection from "./HotNewsSection";
import JobListSection from "./JobListSection";
import LaboreSection from "./LaboreSection";



const HomePage = () => {
  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      <HomeSlider />
      <HomeFilters />
      <HotNewsSection />
      <JobListSection />
      <LaboreSection />
    </div>
  );
};

export default HomePage;