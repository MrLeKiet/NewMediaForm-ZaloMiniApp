import Skeleton from "@/components/Skeleton";
import React from "react";
import { useJobDetail } from "./useJobDetails";

const JobRequirements: React.FC = () => {
    const { job, loading, error } = useJobDetail();
    if (loading) return (
        <div className="border-2 rounded-lg mb-4 mx-3">
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
        <div className="border-2 rounded-lg mb-4 mx-3">
            <div className="bg-white font-bold text-center py-2 border-b">YÊU CẦU CÔNG VIỆC</div>
            <div className="p-3 text-sm text-gray-800">
                <div dangerouslySetInnerHTML={{ __html: job.jobrequirements || "Chưa có yêu cầu." }} />
            </div>
        </div>
    );
};

export default JobRequirements;
