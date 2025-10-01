import Skeleton from "@/components/Skeleton";
import React from "react";
import { useJobDetail } from "./useJobDetails";

const JobGeneralInfo: React.FC = () => {
    const { job, loading, error } = useJobDetail();
    if (loading) return (
        <div className="bg-orange-500 rounded-lg p-3 mb-4 text-white shadow flex flex-col gap-1">
            <Skeleton className="h-6 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/3 mb-1" />
            <Skeleton className="h-4 w-1/4 mb-1" />
            <Skeleton className="h-4 w-1/4 mb-1" />
        </div>
    );
    if (error || !job) return <div>Error loading job details.</div>;
    return (
        <div className="bg-orange-500 rounded-lg p-3 mb-4 text-white shadow flex flex-col gap-1">
            <div className="flex items-center gap-2">
                <span className="font-bold text-base">VỊ TRÍ CÔNG VIỆC: {job.title}</span>
            </div>
            <div className="text-sm">{job.companyname}</div>
            <div className="text-xs">Vị trí: {job.location}</div>
            <div className="text-xs">Mức lương: {job.salary}</div>
            <div className="text-xs">Ngày hết hạn: {job.deadline}</div>
            <div className="text-xs">{job.viewcount || 0} lượt xem</div>
        </div>
    );
};

export default JobGeneralInfo;
