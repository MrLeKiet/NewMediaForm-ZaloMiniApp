import Skeleton from "@/components/Skeleton";
import React from "react";
import { useLabore } from "./useHome";

const LaboreSection: React.FC = () => {
    const { labores, loading, error } = useLabore();

    if (loading) return (
        <div >
            <div className="font-lg font-bold mb-1 text-primary">ỨNG VIÊN MỚI NHẤT</div>
            <div className="flex flex-col gap-2">
                {Array.from({ length: 3 }).map((_, i) => {
                    const uniqueKey = `skeleton-${Date.now()}-${i}`;
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
    if (error) return <div>Lỗi: {String(error)}</div>;
    const isEmpty = !Array.isArray(labores) || labores.length === 0;
    return (
        <div>
            <div className="font-lg font-bold mb-1 text-primary">ỨNG VIÊN MỚI NHẤT</div>
            <div className="flex flex-col gap-2">
                {isEmpty ? (
                    <div className="text-center text-muted py-8 select-none font-lg">
                        Không có ứng viên nào được tìm thấy.
                    </div>
                ) : (
                    labores.map((labore) => (
                    <div key={labore.id} className="flex gap-3 items-center bg-white/5 rounded p-2">
                        {labore.thumbnail && (
                            <img
                                src={labore.thumbnail}
                                alt={labore.fullname}
                                className="w-16 h-16 object-cover"
                            />
                        )}
                        <div className="flex-1">
                            <div className="font-semibold leading-tight mb-1 font-base" style={{ wordBreak: 'break-word' }}>{labore.fullname}</div>
                            <div className="font-xs">
                                Ngành nghề: {Array.isArray(labore.labore) ? labore.labore.join(", ") : (labore.labore || "Chưa cập nhật")}
                            </div>
                            <div className="font-xs">Nơi làm việc: {labore.location || "Thỏa thuận"}</div>
                        </div>
                    </div>
                ))
            )}
            </div>
        </div>
    );
};

export default LaboreSection;
