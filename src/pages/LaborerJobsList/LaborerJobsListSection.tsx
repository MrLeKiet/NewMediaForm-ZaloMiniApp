import MultiSelectPanel from "@/components/MultiSelectPanel";
import Skeleton from "@/components/Skeleton";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListCard from "./ListCard";
import { useJobList, useLaborerJobsList, useSettings, useWards } from "./useLaborerJobsList";

const LaborerJobsListSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'laborer' | 'joblist'>('laborer');
    // Laborer tab state
    const { filters: laborerFilters, setFilters: setLaborerFilters, laborers, loading: loadingLaborer } = useLaborerJobsList();
    // Joblist tab state
    const [jobFilters, setJobFilters] = useState({
        search: "",
        job: "",
        ward: "",
        salary: "",
        gender: "",
        workingTime: ""
    });
    const { jobs, loading: loadingJob } = useJobList(jobFilters);
    const { settings } = useSettings();
    const { wards } = useWards();
    const safeLaborerList = Array.isArray(laborers) ? laborers : [];
    const safeJobList = Array.isArray(jobs) ? jobs : [];

    const navigate = useNavigate();

    const handleLaborerCardClick = (laborer: any) => {
        navigate(`/labore/${laborer.id}`);
    };
    const handleJobCardClick = (job: any) => {
        navigate(`/jobsdetail/${job.id}`);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Tab Switcher */}
            <div className="flex mb-4">
                <button
                    className={`flex-1 py-2 font-bold ${activeTab === 'laborer' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setActiveTab('laborer')}
                >
                    NGƯỜI TÌM VIỆC
                </button>
                <button
                    className={`flex-1 py-2 font-bold ${activeTab === 'joblist' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setActiveTab('joblist')}
                >
                    VIỆC TÌM NGƯỜI
                </button>
            </div>

            {/* Filter Section with MultiSelectPanel */}
            <div className="mb-4">
                {activeTab === 'laborer' ? (
                    <MultiSelectPanel
                        selects={[
                            {
                                key: "job",
                                label: "Ngành đào tạo",
                                options: [{ label: "Tất cả", value: "" }, ...(Array.isArray(settings.ListJob) ? settings.ListJob : [])],
                                placeholder: "Chọn ngành đào tạo"
                            },
                            {
                                key: "ward",
                                label: "Địa điểm",
                                options: [{ label: "Tất cả", value: "" }, ...wards.map(w => ({ label: w.text, value: w.value }))],
                                placeholder: "Chọn địa điểm"
                            },
                            {
                                key: "age",
                                label: "Độ tuổi",
                                options: [{ label: "Tất cả", value: "" }, ...(Array.isArray(settings.ListAge) ? settings.ListAge : [])],
                                placeholder: "Chọn độ tuổi"
                            },
                            {
                                key: "gender",
                                label: "Giới tính",
                                options: [{ label: "Tất cả", value: "" }, ...(Array.isArray(settings.ListGenderSearch) ? settings.ListGenderSearch : [])],
                                placeholder: "Chọn giới tính"
                            },
                        ]}
                        values={laborerFilters}
                        onChange={(key, value) => setLaborerFilters(prev => ({ ...prev, [key]: value }))}
                    />
                ) : (
                    <MultiSelectPanel
                        selects={[
                            {
                                key: "job",
                                label: "Ngành nghề",
                                options: [{ label: "Tất cả", value: "" }, ...(Array.isArray(settings.ListJob) ? settings.ListJob : [])],
                                placeholder: "Chọn ngành nghề"
                            },
                            {
                                key: "ward",
                                label: "Địa điểm",
                                options: [{ label: "Tất cả", value: "" }, ...wards.map(w => ({ label: w.text, value: w.value }))],
                                placeholder: "Chọn địa điểm"
                            },
                            {
                                key: "salary",
                                label: "Mức lương",
                                options: [{ label: "Tất cả", value: "" }, ...(Array.isArray(settings.ListSalary) ? settings.ListSalary : [])],
                                placeholder: "Chọn mức lương"
                            },
                            {
                                key: "gender",
                                label: "Giới tính",
                                options: [{ label: "Tất cả", value: "" }, ...(Array.isArray(settings.ListGenderSearch) ? settings.ListGenderSearch : [])],
                                placeholder: "Chọn giới tính"
                            },
                            {
                                key: "workingTime",
                                label: "Loại công việc",
                                options: [{ label: "Tất cả", value: "" }, ...(Array.isArray(settings.ListWorkingTime) ? settings.ListWorkingTime : [])],
                                placeholder: "Chọn loại công việc"
                            },
                        ]}
                        values={jobFilters}
                        onChange={(key, value) => setJobFilters(prev => ({ ...prev, [key]: value }))}
                    />
                )}
            </div>

            {/* List Section */}
            <div>
                {(() => {
                    if (activeTab === 'laborer') {
                        if (loadingLaborer) {
                            return (
                                <>
                                    <Skeleton className="h-24 mb-2" />
                                    <Skeleton className="h-24 mb-2" />
                                    <Skeleton className="h-24 mb-2" />
                                </>
                            );
                        }
                        if (safeLaborerList.length > 0) {
                            return (
                                <ListCard
                                    type={'laborer'}
                                    data={safeLaborerList}
                                    onCardClick={handleLaborerCardClick}
                                />
                            );
                        }
                        return (
                            <p className="text-center text-gray-500 py-8">Không có dữ liệu người tìm việc.</p>
                        );
                    } else {
                        if (loadingJob) {
                            return (
                                <>
                                    <Skeleton className="h-24 mb-2" />
                                    <Skeleton className="h-24 mb-2" />
                                    <Skeleton className="h-24 mb-2" />
                                </>
                            );
                        }
                        if (safeJobList.length > 0) {
                            return (
                                <ListCard
                                    type={'joblist'}
                                    data={safeJobList}
                                    onCardClick={handleJobCardClick}
                                />
                            );
                        }
                        return (
                            <p className="text-center text-gray-500 py-8">Không có dữ liệu việc làm.</p>
                        );
                    }
                })()}
            </div>
        </div>
    );
};

export default LaborerJobsListSection;
