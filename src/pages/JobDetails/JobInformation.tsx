import Skeleton from "@/components/Skeleton";
import React from "react";
import { useJobDetail } from "./useJobDetails";

const JobInformation: React.FC = () => {
    const { job, loading, error } = useJobDetail();
    if (loading) return (
        <div className="border-2 rounded-lg mb-4 mx-3">
            <Skeleton className="h-6 w-1/2 mb-2" />
            <div className="p-3 space-y-2">
                {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton key={`info-skeleton-${i}-${Math.random().toString(36).slice(2, 11)}`} className="h-4 w-2/3 mb-2" />
                ))}
            </div>
        </div>
    );
    if (error || !job) return <div>Error loading job details.</div>;
    return (
        <div className="border-2 rounded-lg mb-4 mx-3">
            <div className="bg-white font-bold text-center py-2 border-b">THÔNG TIN CHUNG</div>
            <div className="p-3 text-sm text-gray-800 space-y-2">
                <div><b>Ngày đăng tin:</b> {job.publishdate}</div>
                <div><b>Vị trí (mới):</b> {job.location}</div>
                <div><b>Cấp bậc:</b> {job.position}</div>
                <div><b>Yêu cầu giới tính:</b> {job.gender}</div>
                <div><b>Số lượng tuyển:</b> {job.numofrecruitment}</div>
                <div><b>Thời gian làm việc:</b> {job.workingtime || "Giờ hành chính"}</div>
                <div><b>Yêu cầu bằng cấp:</b> {job.degreerequired}</div>
                <div><b>Yêu cầu kinh nghiệm:</b> {job.experience || "Không yêu cầu kinh nghiệm"}</div>
                <div><b>Ngành nghề:</b> {job.job}</div>
                <div><b>Hạn nộp hồ sơ:</b> {job.deadline}</div>
            </div>
        </div>
    );
};
export default JobInformation;