import Skeleton from "@/components/Skeleton";
import React from "react";
import { useLaborerDetail } from "./useLaborerDetails";

const LaborerJobInfo: React.FC = () => {
    const { laborer, loading, error } = useLaborerDetail();
    if (loading) return (
        <div className="">
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
        </div>
    );
    if (error || !laborer) return <div>Error loading job info.</div>;
    return (
        <div className="">
            <div className="font-bold">Thông tin nghề nghiệp</div>
            <div className="text-sm text-gray-800 mx-2 space-y-1">
                <div>Công việc mong muốn: {laborer.desiredjobtitle || "Chưa có thông tin."}</div>
                <div>Ngành nghề: {Array.isArray(laborer.job) ? laborer.job.join(", ") : (laborer.job || "Chưa có thông tin.")}</div>
                <div>Nơi làm việc: {laborer.locationjob || "Chưa có thông tin."}</div>
                <div>Lương mong muốn: {laborer.salary || "Chưa có thông tin."}</div>
            </div>
        </div>
    );
};

export default LaborerJobInfo;