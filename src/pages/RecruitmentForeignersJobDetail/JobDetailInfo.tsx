import React from "react";

interface JobDetailInfoProps {
    job: any;
}

const JobDetailInfo: React.FC<JobDetailInfoProps> = ({ job }) => {
    console.log("[JobDetailInfo] job prop:", job);
    const detail = job?.detailjob?.[0];
    return (
        <>
            <div className="font-bold text-xl mb-4 text-gray-800">{job.title}</div>
            <div className="text-base text-gray-700 font-semibold mb-1 flex items-center">{job.companyname}</div>
            <div className="text-gray-500 text-sm mb-4">Ngày đăng: {job.publishdate}</div>
            <div className="relative rounded-lg bg-white p-4 shadow-lg mt-6" style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0,0.15)' }}>
                <div className="absolute left-0 top-0 w-full h-1 rounded-t-lg bg-orange-500" style={{ borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }} />
                <div className="font-bold text-orange-500 mb-2 mt-2">{detail?.position || "Chi tiết công việc"}</div>
                <ul className="text-gray-800 text-sm space-y-1">
                    {detail && (
                        <>
                            <li><b>Chức danh công việc:</b> {detail.jobtitle}</li>
                            <li><b>Số lượng:</b> {detail.quantity}</li>
                            <li><b>Thời hạn làm việc:</b> {detail.workingtime}</li>
                            <li><b>Địa điểm làm việc:</b> {detail.location}</li>
                            <li><b>Trình độ:</b> {detail.level}</li>
                            <li><b>Lương:</b> {detail.salary}</li>
                            <li><b>Kinh nghiệm:</b> {detail.experience}</li>
                            <li><b>Mô tả:</b> <span dangerouslySetInnerHTML={{ __html: detail.summary }} /></li>
                        </>
                    )}
                </ul>
            </div>
        </>
    );
};

export default JobDetailInfo;
