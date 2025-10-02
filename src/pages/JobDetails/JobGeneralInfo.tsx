import Skeleton from "@/components/Skeleton";
import React from "react";
import { useJobDetail } from "./useJobDetails";

const JobGeneralInfo: React.FC = () => {
    const { job, loading, error } = useJobDetail();
    if (loading) return (
        <div className="text-white shadow flex flex-col">
            <Skeleton className="h-6 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/3 mb-1" />
            <Skeleton className="h-4 w-1/4 mb-1" />
            <Skeleton className="h-4 w-1/4 mb-1" />
        </div>
    );
    if (error || !job) return <div>Error loading job details.</div>;
    return (
        <div className="text-black flex flex-col">
            <div className="flex items-center">
                <span className="font-bold text-2xl">{job.title}</span>
            </div>
            <div className="mx-2 space-y-1">
                <div className="flex">
                    <img className="w-16 h-16 object-cover" src={job.thumbnail} alt={job.title} />
                    <div className="text-sm">{job.companyname}</div>
                </div>
                <div className="text-sm">Vị trí: {job.location}</div>
                <div className="text-sm">{job.salary}</div>
                <div className="text-sm">{job.deadline}</div>
                <div className="text-sm">{job.viewcount || 0} lượt xem</div>
            </div>
        </div>
    );
};

export default JobGeneralInfo;
