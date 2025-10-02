import InputBox from "@/components/InputBox";
import SingleSelect from "@/components/SingleSelect";
import React from "react";

const TAT_CA_OPTION = { label: "Tất cả", value: "" };

interface LaborJobsFilterProps {
    activeTab: 'labore' | 'joblist';
    settings: any;
    wards: any[];
    filters: any;
    onFilterChange: (key: string, value: string) => void;
}

const LaborJobsFilter: React.FC<LaborJobsFilterProps> = ({ activeTab, settings, wards, filters, onFilterChange }) => {
    return (
        <div className="bg-white rounded shadow p-4 mb-4">
            {/* LABORE FILTERS */}
            {activeTab === 'labore' ? (
                <>
                    <div className="mb-2">
                        <SingleSelect
                            options={[TAT_CA_OPTION, ...((Array.isArray(settings.ListJob) ? settings.ListJob : []))]}
                            value={filters.job}
                            onChange={val => onFilterChange('job', val)}
                            placeholder="Chọn ngành đào tạo"
                        />
                    </div>
                    <div className="mb-2">
                        <SingleSelect
                            options={[TAT_CA_OPTION, ...wards.map(w => ({ label: w.text, value: w.value }))]}
                            value={filters.ward}
                            onChange={val => onFilterChange('ward', val)}
                            placeholder="Chọn địa điểm"
                        />
                    </div>
                    <div className="mb-2">
                        <SingleSelect
                            options={[TAT_CA_OPTION, ...((Array.isArray(settings.ListAge) ? settings.ListAge : []))]}
                            value={filters.age}
                            onChange={val => onFilterChange('age', val)}
                            placeholder="Chọn độ tuổi"
                        />
                    </div>
                    <div className="mb-2">
                        <SingleSelect
                            options={[TAT_CA_OPTION, ...((Array.isArray(settings.ListGenderSearch) ? settings.ListGenderSearch : []))]}
                            value={filters.gender}
                            onChange={val => onFilterChange('gender', val)}
                            placeholder="Chọn giới tính"
                        />
                    </div>
                </>
            ) : (
            /* JOBLIST FILTERS */
                <>
                    <div className="mb-2">
                        <InputBox label="Từ khóa" icon={null}>
                            <input
                                type="text"
                                className="border rounded px-3 py-2 w-full"
                                placeholder="Nhập từ khóa"
                                value={filters.search}
                                onChange={e => onFilterChange('search', e.target.value)}
                            />
                        </InputBox>
                    </div>
                    <div className="mb-2">
                        <SingleSelect
                            options={[TAT_CA_OPTION, ...((Array.isArray(settings.ListJob) ? settings.ListJob : []))]}
                            value={filters.job}
                            onChange={val => onFilterChange('job', val)}
                            placeholder="Chọn ngành nghề"
                        />
                    </div>
                    <div className="mb-2">
                        <SingleSelect
                            options={[TAT_CA_OPTION, ...wards.map(w => ({ label: w.text, value: w.value }))]}
                            value={filters.ward}
                            onChange={val => onFilterChange('ward', val)}
                            placeholder="Chọn địa điểm"
                        />
                    </div>
                    <div className="mb-2">
                        <SingleSelect
                            options={[TAT_CA_OPTION, ...((Array.isArray(settings.ListSalary) ? settings.ListSalary : []))]}
                            value={filters.salary}
                            onChange={val => onFilterChange('salary', val)}
                            placeholder="Chọn mức lương"
                        />
                    </div>
                    <div className="mb-2">
                        <SingleSelect
                            options={[TAT_CA_OPTION, ...((Array.isArray(settings.ListGenderSearch) ? settings.ListGenderSearch : []))]}
                            value={filters.gender}
                            onChange={val => onFilterChange('gender', val)}
                            placeholder="Chọn giới tính"
                        />
                    </div>
                    <div className="mb-2">
                        <SingleSelect
                            options={[TAT_CA_OPTION, ...((Array.isArray(settings.ListWorkingTime) ? settings.ListWorkingTime : []))]}
                            value={filters.workingTime}
                            onChange={val => onFilterChange('workingTime', val)}
                            placeholder="Chọn loại công việc"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default LaborJobsFilter;
