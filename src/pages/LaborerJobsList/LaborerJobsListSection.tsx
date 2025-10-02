import Skeleton from "@/components/Skeleton";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LaborerJobsFilter from "./LaborerJobsFilter";
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

            {/* Filter Section */}
            <div className="mb-4">
                <LaborerJobsFilter
                    activeTab={activeTab}
                    settings={settings}
                    wards={wards}
                    filters={activeTab === 'laborer' ? laborerFilters : jobFilters}
                    onFilterChange={(key, value) => {
                        if (activeTab === 'laborer') {
                            setLaborerFilters(prev => ({ ...prev, [key]: value }));
                        } else {
                            setJobFilters(prev => ({ ...prev, [key]: value }));
                        }
                    }}
                />
            </div>

            {/* List Section */}
            <div>
                {activeTab === 'laborer' ? (
                    loadingLaborer ? (
                        <>
                            <Skeleton className="h-24 mb-2" />
                            <Skeleton className="h-24 mb-2" />
                            <Skeleton className="h-24 mb-2" />
                        </>
                    ) : safeLaborerList.length > 0 ? (
                        <ListCard
                            type={'laborer'}
                            data={safeLaborerList}
                            onCardClick={handleLaborerCardClick}
                        />
                    ) : (
                        <p className="text-center text-gray-500 py-8">Không có dữ liệu người tìm việc.</p>
                    )
                ) : (
                    loadingJob ? (
                        <>
                            <Skeleton className="h-24 mb-2" />
                            <Skeleton className="h-24 mb-2" />
                            <Skeleton className="h-24 mb-2" />
                        </>
                    ) : safeJobList.length > 0 ? (
                        <ListCard
                            type={'joblist'}
                            data={safeJobList}
                            onCardClick={handleJobCardClick}
                        />
                    ) : (
                        <p className="text-center text-gray-500 py-8">Không có dữ liệu việc làm.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default LaborerJobsListSection;
