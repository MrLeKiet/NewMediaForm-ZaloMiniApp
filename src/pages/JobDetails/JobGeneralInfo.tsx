import Skeleton from "@/components/Skeleton";
import React from "react";
import { useJobDetail } from "./useJobDetails";

const JobGeneralInfo: React.FC = () => {
    const { job, loading, error } = useJobDetail();
    if (loading) return (
        <div className="p-3 mb-4 text-white shadow flex flex-col gap-1">
            <Skeleton className="h-6 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/3 mb-1" />
            <Skeleton className="h-4 w-1/4 mb-1" />
            <Skeleton className="h-4 w-1/4 mb-1" />
        </div>
    );
    if (error || !job) return <div>Error loading job details.</div>;
    return (
        <div className="p-4 mb-4 text-black shadow flex flex-col gap-3">
            <div className="flex items-center">
                <span className="font-bold text-2xl">{job.title}</span>
            </div>
            <div>
                <div className="text-sm">{job.companyname}</div>
                <div className="text-sm">Vị trí: {job.location}</div>
                <div className="text-sm">Mức lương: {job.salary}</div>
                <div className="text-sm">Ngày hết hạn: {job.deadline}</div>
                <div className="text-sm">{job.viewcount || 0} lượt xem</div>
            </div>
        </div>
    );
};

export default JobGeneralInfo;
