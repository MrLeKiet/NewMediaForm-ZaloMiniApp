import Card from "@/components/Card";
import React from "react";

interface ListCardProps {
    type: 'laborer' | 'joblist';
    data: any[];
    onCardClick?: (item: any) => void;
}

const ListCard: React.FC<ListCardProps> = ({ type, data, onCardClick }) => {
    if (data.length === 0) {
        return <div className="text-center text-muted py-8 select-none font-lg">{type === 'laborer' ? 'Không có ứng viên nào được tìm thấy.' : 'Không có công việc nào được tìm thấy.'}</div>;
    }
    return (
        <>
            {type === 'laborer'
                ? data.map(laborer => (
                    <Card
                        key={laborer.id}
                        thumbnail={laborer.thumbnail}
                        onClick={() => onCardClick?.(laborer)}
                    >
                        <div className="card-title font-bold line-clamp-2">{laborer.fullname}</div>
                        <div className="card-subtitle truncate line-clamp-2">Ngành nghề: {Array.isArray(laborer.job) ? laborer.job.join(", ") : laborer.job}</div>
                        <div className="card-meta truncate">Địa chỉ: {laborer.location}</div>
                        <div className="card-meta truncate">Lương: {laborer.salary}</div>
                    </Card>
                ))
                : data.map(job => (
                    <Card
                        key={job.id}
                        thumbnail={job.thumbnail}
                        onClick={() => onCardClick?.(job)}
                    >
                        <div className="card-title font-bold line-clamp-2">{job.title}</div>
                        <div className="card-subtitle truncate line-clamp-2">Ngành nghề: {job.job}</div>
                        <div className="card-meta truncate">Địa chỉ: {job.location}</div>
                        <div className="card-meta truncate">Lương: {job.salary}</div>
                    </Card>
                ))}
        </>
    );
};

export default ListCard;
