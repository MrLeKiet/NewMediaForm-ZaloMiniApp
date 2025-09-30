import Skeleton from "@/components/Skeleton";
import { useUrgentJobs } from "@/pages/Home/useHome";
import React from "react";
import { useNavigate } from "zmp-ui";

const JobListSection: React.FC = () => {
    const { jobs, loading, error } = useUrgentJobs();
    const navigate = useNavigate();

    const handleClick = (job: any) => {
        const id = job.id || job.jodId || job.jobId;
        if (id) {
            navigate(`/jobsdetail/${id}`);
        } else {
            alert("Không tìm thấy id công việc!");
        }
    };

    if (loading) return (
        <div className="px-4 rounded-lg">
            <div className="text-lg font-bold mb-1">VIỆC LÀM MỚI NHẤT</div>
            <div className="flex flex-col gap-2">
                {Array.from({ length: 4 }).map((_, i) => {
                    const uniqueKey = `skeleton-${i}-${Math.random().toString(36).slice(2, 11)}`;
                    return (
                        <div key={uniqueKey} className="flex gap-3 items-center bg-white/5 rounded p-2 w-full">
                            <Skeleton className="w-16 h-16" />
                            <div className="flex-1">
                                <Skeleton className="h-4 w-2/3 mb-2" />
                                <Skeleton className="h-3 w-1/2 mb-1" />
                                <Skeleton className="h-3 w-1/3" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
    if (error) return <p>Có lỗi xảy ra khi tải dữ liệu.</p>;
    const isEmpty = !Array.isArray(jobs) || jobs.length === 0;
    return (
        <div className="px-4 rounded-lg">
            <div className="text-lg font-bold mb-1">VIỆC LÀM MỚI NHẤT</div>
            <div className="flex flex-col gap-2">
                {isEmpty ? (
                    <div className="text-center text-gray-400 py-8 select-none">
                        Không có việc làm nào được tìm thấy.
                    </div>
                ) : (
                    jobs.map((job) => (
                        <button
                            key={job.id || job.jodId || job.jobId}
                            className="flex gap-3 items-center bg-white/5 rounded p-2 w-full text-left cursor-pointer hover:bg-white/10"
                            onClick={() => handleClick(job)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    handleClick(job);
                                }
                            }}
                            tabIndex={0}
                            type="button"
                        >
                            {job.thumbnail && (
                                <img
                                    src={job.thumbnail}
                                    alt={job.title}
                                    className="w-16 h-16 object-cover"
                                />
                            )}
                            <div className="flex-1">
                                <div
                                    className="font-semibold leading-tight mb-1"
                                    style={{ wordBreak: "break-word" }}
                                >
                                    {job.title}
                                </div>
                                <div className="text-xs">
                                    Khu vực: {job.location || "Chưa cập nhật"}
                                </div>
                                <div className="text-xs">
                                    Mức lương: {job.salary || "Thỏa thuận"}
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export default JobListSection;
