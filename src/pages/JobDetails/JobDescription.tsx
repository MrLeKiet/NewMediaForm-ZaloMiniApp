import Skeleton from "@/components/Skeleton";
import React from "react";
import { useJobDetail } from "./useJobDetails";

const JobDescription: React.FC = () => {
    const { job, loading, error } = useJobDetail();
    if (loading) return (
        <div className="border-2 border-orange-500 rounded-lg mb-4">
            <Skeleton className="h-6 w-1/2 mb-2" />
            <div className="p-3">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        </div>
    );
    if (error || !job) return <div>Error loading job details.</div>;
    return (
        <div className="border-2 border-orange-500 rounded-lg mb-4">
            <div className="bg-white text-orange-500 font-bold text-center py-2 border-b border-orange-500">MÔ TẢ CÔNG VIỆC</div>
            <div className="p-3 text-sm text-gray-800">
                <div dangerouslySetInnerHTML={{ __html: job.summary || "Chưa có mô tả." }} />
            </div>
        </div>
    );
};

export default JobDescription;
