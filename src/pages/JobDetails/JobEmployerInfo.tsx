import Skeleton from "@/components/Skeleton";
import React from "react";
import { useJobDetail } from "./useJobDetails";

const JobEmployerInfo: React.FC = () => {
    const { job, loading, error } = useJobDetail();
    if (loading) return (
        <div className="border-2 rounded-lg">
            <Skeleton className="h-6 w-1/2 mb-2" />
            <div className="">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={`employer-skeleton-${i}-${Math.random().toString(36).slice(2, 11)}`} className="h-4 w-2/3 mb-2" />
                ))}
                <Skeleton className="h-8 w-full mt-2" />
            </div>
        </div>
    );
    if (error || !job) return <div>Error loading job details.</div>;
    return (
        <div className="">
            <div className="font-bold">NHÀ TUYỂN DỤNG</div>
            <div className="text-sm text-gray-800 mx-2 space-y-1">
                <div><b>Tên công ty:</b> {job.companyname}</div>
                <div><b>Địa chỉ:</b> {job.companyaddress}</div>
                <div><b>Quy mô:</b> {job.companyscale}</div>
            </div>
        </div>
    );
};

export default JobEmployerInfo;
