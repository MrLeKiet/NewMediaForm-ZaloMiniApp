import React from "react";
import NewsCard from "./NewsCard";
import { useHotNews } from "./useHotNews";
import { useNavigate } from "zmp-ui";

const HotNewsSection: React.FC = () => {
    const { news, loading, error } = useHotNews();
    const navigate = useNavigate();

    const handleNewsClick = (id: string) => {
        navigate(`/news/${id}`);
    };

    if (loading) return <div>Đang tải tin tức...</div>;
    if (error) return <div className="text-red-500">Lỗi khi tải tin tức.</div>;
    const isEmpty = !Array.isArray(news) || news.length === 0;
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Tin tức nổi bật</h1>
            {isEmpty ? (
                <div className="text-center text-muted py-8 select-none font-lg">
                    Không có tin tức nào được tìm thấy.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {news.map((item: any) => (
                        <NewsCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            thumbnail={item.thumbnail}
                            publishdate={item.publishdate}
                            onClick={handleNewsClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HotNewsSection;