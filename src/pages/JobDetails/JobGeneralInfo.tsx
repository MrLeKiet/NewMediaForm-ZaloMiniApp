import React from "react";

const JobGeneralInfo: React.FC<{ job: any }> = ({ job }) => (
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

export default JobGeneralInfo;
