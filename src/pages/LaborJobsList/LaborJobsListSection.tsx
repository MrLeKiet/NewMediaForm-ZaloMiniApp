import Skeleton from "@/components/Skeleton";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LaborJobsFilter from "./LaborJobsFilter";
import ListCard from "./ListCard";
import { useJobList, useLaborJobsList, useSettings, useWards } from "./useLaborJobsList";

const LaborJobsListSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'labore' | 'joblist'>('labore');
    // Labor tab state
    const { filters: laboreFilters, setFilters: setLaboreFilters, labores, loading: loadingLabore } = useLaborJobsList();
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
    const safeLaboreList = Array.isArray(labores) ? labores : [];
    const safeJobList = Array.isArray(jobs) ? jobs : [];

    const navigate = useNavigate();

    const handleLaboreCardClick = (labore: any) => {
        navigate(`/labor/${labore.id}`);
    };
    const handleJobCardClick = (job: any) => {
        navigate(`/jobsdetail/${job.id}`);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Tab Switcher */}
            <div className="flex mb-4">
                <button
                    className={`flex-1 py-2 font-bold ${activeTab === 'labore' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setActiveTab('labore')}
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
                <LaborJobsFilter
                    activeTab={activeTab}
                    settings={settings}
                    wards={wards}
                    filters={activeTab === 'labore' ? laboreFilters : jobFilters}
                    onFilterChange={(key, value) => {
                        if (activeTab === 'labore') {
                            setLaboreFilters(prev => ({ ...prev, [key]: value }));
                        } else {
                            setJobFilters(prev => ({ ...prev, [key]: value }));
                        }
                    }}
                />
            </div>

            {/* List Section */}
            <div>
                {activeTab === 'labore' ? (
                    loadingLabore ? (
                        <>
                            <Skeleton className="h-24 mb-2" />
                            <Skeleton className="h-24 mb-2" />
                            <Skeleton className="h-24 mb-2" />
                        </>
                    ) : safeLaboreList.length > 0 ? (
                        <ListCard
                            type={'labore'}
                            data={safeLaboreList}
                            onCardClick={handleLaboreCardClick}
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

export default LaborJobsListSection;
