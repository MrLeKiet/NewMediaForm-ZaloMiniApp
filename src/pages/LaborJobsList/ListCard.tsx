import Card from "@/components/Card";
import React from "react";

interface ListCardProps {
    type: 'labore' | 'joblist';
    data: any[];
    onCardClick?: (item: any) => void;
}

const ListCard: React.FC<ListCardProps> = ({ type, data, onCardClick }) => {
    if (data.length === 0) {
        return <div className="text-center text-muted py-8 select-none font-lg">{type === 'labore' ? 'Không có ứng viên nào được tìm thấy.' : 'Không có công việc nào được tìm thấy.'}</div>;
    }
    return (
        <>
            {type === 'labore'
                ? data.map(labore => (
                    <Card
                        key={labore.id}
                        thumbnail={labore.thumbnail}
                        onClick={() => onCardClick?.(labore)}
                    >
                        <div className="card-title font-bold line-clamp-2">{labore.fullname}</div>
                        <div className="card-subtitle truncate line-clamp-2">Ngành nghề: {Array.isArray(labore.job) ? labore.job.join(", ") : labore.job}</div>
                        <div className="card-meta truncate">Địa chỉ: {labore.location}</div>
                        <div className="card-meta truncate">Lương: {labore.salary}</div>
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
