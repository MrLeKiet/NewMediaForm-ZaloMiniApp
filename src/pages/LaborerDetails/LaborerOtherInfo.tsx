import Skeleton from "@/components/Skeleton";
import React from "react";
import { useLaborerDetail } from "./useLaborerDetails";

const LaborerOtherInfo: React.FC = () => {
    const { laborer, loading, error } = useLaborerDetail();
    if (loading) return (
        <div className="">
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
        </div>
    );
    if (error || !laborer) return <div>Error loading other info.</div>;
    return (
        <div className="">
            <div className="font-bold">Thông tin khác</div>
            <div className="text-sm text-gray-800 mx-2 space-y-1">
                <div>Kỹ năng máy tính: {laborer.computerproficiency || "Chưa có thông tin."}</div>
                <div>Trình độ ngoại ngữ: {laborer.foreignlanguages || "Chưa có thông tin."}</div>
                <div>Phúc lợi: {laborer.benefits || "Chưa có thông tin."}</div>
                <div>Hình thức phỏng vấn: {laborer.interviewformat || "Chưa có thông tin."}</div>
            </div>
        </div>
    );
};

export default LaborerOtherInfo;