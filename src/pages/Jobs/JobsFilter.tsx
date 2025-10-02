import LaborerJobsFilter from "../LaborerJobsList/LaborerJobsFilter";
import { useSettings, useWards } from "../LaborerJobsList/useLaborerJobsList";

const JobsFilter = ({ filters, onFilterChange }: any) => {
  const { settings } = useSettings();
  const { wards } = useWards();
  return (
    <LaborerJobsFilter
      activeTab="joblist"
      settings={settings}
      wards={wards}
      filters={filters}
      onFilterChange={onFilterChange}
    />
  );
};

export default JobsFilter;
