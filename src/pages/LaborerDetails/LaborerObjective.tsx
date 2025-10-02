import Skeleton from "@/components/Skeleton";
import React from "react";
import { useLaborerDetail } from "./useLaborerDetails";

const LaborerObjective: React.FC = () => {
    const { laborer, loading, error } = useLaborerDetail();
    if (loading) return (
        <div className="">
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
        </div>
    );
    if (error || !laborer) return <div>Error loading laborer objective.</div>;
    return (
        <div className="">
            <div className="font-bold">Mục tiêu nghề nghiệp</div>
            <div className="text-sm text-gray-800 mx-2 space-y-1">
                <div dangerouslySetInnerHTML={{ __html: laborer.objectivedescription || "Chưa có thông tin." }} />
            </div>
        </div>
    );
};

export default LaborerObjective;
