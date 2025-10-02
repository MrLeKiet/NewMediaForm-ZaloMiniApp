import Skeleton from "@/components/Skeleton";
import React from "react";
import { useLaborerDetail } from "./useLaborerDetails";

const LaborerGeneralInfo: React.FC = () => {
    const { laborer, loading, error } = useLaborerDetail();
    if (loading) return (
        <div className="text-white shadow flex flex-col">
            <Skeleton className="h-6 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-1" />
            <Skeleton className="h-4 w-1/3 mb-1" />
            <Skeleton className="h-4 w-1/4 mb-1" />
        </div>
    );
    if (error || !laborer) return <div>Error loading laborer details.</div>;
    return (
        <div className="text-black flex flex-col">
            <div className="flex items-center mb-2">
                <span className="font-bold text-2xl mr-2">{laborer.fullname}</span>
            </div>
            <div className="mx-2 space-y-1">
                <img className="w-16 h-16 object-cover rounded" src={laborer.thumbnail} alt={laborer.fullname} />
                <div className="text-sm">{laborer.age} tuổi</div>
                <div className="text-sm">Giới tính: {laborer.gender}</div>
                <div className="text-sm">Ngày sinh: {laborer.birthdate}</div>
                <div className="text-sm">Căn cước: {laborer.cid}</div>
                <div className="text-sm">Địa chỉ: {laborer.address}</div>
                <div className="text-sm">Dân tộc: {laborer.ethnicity}</div>
                <div className="text-sm">Quốc tịch: {laborer.nationality}</div>
                <div className="text-sm">Số điện thoại: {laborer.phone}</div>
                <div className="text-sm">Email: {laborer.email}</div>
                <div className="text-sm">Cập nhật: {laborer.updatedate}</div>
                <div className="text-sm">Lượt xem: {laborer.viewcount}</div>
            </div>
        </div>
    );
};

export default LaborerGeneralInfo;
