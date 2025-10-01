
import SingleSelect from "@/components/SingleSelect";
import React from "react";
import { useFilterOptions } from "./useRecruitmentForeigners";

export type FilterBarProps = {
    value: string;
    onChange: (selected: string) => void;
    placeholder?: string;
};

const FilterBar: React.FC<FilterBarProps> = ({ value, onChange, placeholder }) => {

    const { data: options } = useFilterOptions();

    const allOptions = [{ label: "Tất cả", value: "" }, ...(options || [])];
    return (
        <SingleSelect
            options={allOptions}
            value={value}
            onChange={onChange}
            placeholder={placeholder || "Chọn doanh nghiệp"}
        />
    );
};

export default FilterBar;
