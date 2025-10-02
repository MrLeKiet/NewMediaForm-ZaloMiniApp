import React, { useState } from "react";
import JobsFilter from "./JobsFilter";
import JobsList from "./JobsList";

const JobsPage: React.FC = () => {
  const [filters, setFilters] = useState<any>({
    job: "",
    ward: "",
    age: "",
    gender: "",
    search: "",
    salary: "",
    workingTime: "",
  });

  // Build filter params for API
  const filterParams: Record<string, string> = {};
  Object.keys(filters).forEach(key => {
    if (filters[key] !== "") {
      filterParams[key] = filters[key];
    }
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      <JobsFilter filters={filters} onFilterChange={handleFilterChange} />
      <JobsList filters={filterParams} />
    </div>
  );
};

export default JobsPage;
