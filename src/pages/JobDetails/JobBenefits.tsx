import React from "react";
import { useJobDetail } from "./useJobDetails";

const JobBenefits: React.FC = () => {
    const { job, loading, error } = useJobDetail();
    if (loading) return <div>Loading...</div>;
    if (error || !job) return <div>Error loading job details.</div>;
    return (
        <div className="border-2 border-orange-500 rounded-lg mb-4">
            <div className="bg-white text-orange-500 font-bold text-center py-2 border-b border-orange-500">CHẾ ĐỘ PHÚC LỢI</div>
            <div className="p-3 text-sm text-gray-800">
                <div dangerouslySetInnerHTML={{ __html: job.benefits || "Chưa có thông tin." }} />
            </div>
        </div>
    );
};

export default JobBenefits;
