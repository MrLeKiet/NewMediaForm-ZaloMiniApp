import React, { useState } from "react";
import LaborerFilter from "./LaborerFilter";
import LaborerList from "./LaborerList";

const LaborerPage: React.FC = () => {
  const [filters, setFilters] = useState<any>({
    job: "",
    ward: "",
    age: "",
    gender: "",
    search: "",
    salary: "",
    workingTime: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      <LaborerFilter filters={filters} onFilterChange={handleFilterChange} />
      <LaborerList filters={filters} />
    </div>
  );
};

export default LaborerPage;
