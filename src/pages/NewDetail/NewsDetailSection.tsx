import Skeleton from "@/components/Skeleton";
import { useNavigate } from "zmp-ui";
import { useNewDetail } from "./useNewDetail";

const NewsDetailSection = () => {
    const { news, loading, error } = useNewDetail();
    const navigate = useNavigate();

    function formatDate(dateStr: string) {
        const parts = dateStr.split("/");
        if (parts.length === 3) {
            return `${parts[0]}/${parts[1]}/${parts[2]}`;
        }
        return dateStr;
    }

    function decodeHtml(html: string) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    function decodeAndFixImages(html: string) {
        const decoded = decodeHtml(html);
        const imageBaseUrl = import.meta.env.VITE_API_IMAGE_URL;
        return decoded.replace(
            /src="\/FileStorage/g,
            `src="${imageBaseUrl}`
        );
    }

    if (loading) {
        return (
            <div className="bg-[#f4f4f4] min-h-screen p-4" style={{ paddingTop: "var(--safe-top)" }}>
                {/* Title skeleton */}
                <Skeleton className="h-8 w-2/3 mb-4" />
                {/* Date skeleton */}
                <Skeleton className="h-4 w-1/4 mb-2" />
                {/* Content skeleton */}
                <div className="mb-4">
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-5/6 mb-2" />
                    <Skeleton className="h-6 w-2/3 mb-2" />
                    <Skeleton className="h-6 w-1/2" />
                </div>
                {/* Related news skeleton */}
                <Skeleton className="h-6 w-1/3 mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-white rounded shadow p-2 flex flex-col">
                            <Skeleton className="w-full h-32 mb-2" />
                            <Skeleton className="h-4 w-1/2 mb-1" />
                            <Skeleton className="h-5 w-2/3" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    if (error) {
        return <div className="text-red-500">Lỗi khi tải chi tiết tin tức.</div>;
    }
    if (!news) {
        return null;
    }

    return (
        <div className="bg-[#f4f4f4] min-h-screen p-4" style={{ paddingTop: "var(--safe-top)"}}>
            <h1 className="text-2xl font-bold">{news.title}</h1>
            <div className="flex items-center gap-2 text-[#FFA726] text-sm mb-2">
                {news.publishdate ? formatDate(news.publishdate) : ""}
            </div>
            <div className="text-sm text-black mb-4">
                <div className="news-detail-content" dangerouslySetInnerHTML={{ __html: decodeAndFixImages(news.description) }} />
                <style>{`
                    .news-detail-content img {
                        max-width: 100%;
                        max-height: 100%;
                        width: auto !important;
                        height: auto !important;
                        display: block;
                        margin: 0 auto;
                    }
                `}</style>
            </div>
            <div className="text-lg font-bold mb-2">Bài viết liên quan</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {news.relatedNews?.map((item: any) => (
                    <div key={item.id} className="bg-white rounded shadow p-2 flex flex-col">
                        <div className="relative">
                            {item.thumbnail && (
                                <img src={item.thumbnail} alt={item.title} className="w-full h-32 object-cover rounded" />
                            )}
                            <span className="absolute top-2 left-2 bg-[#E53935] text-white text-xs px-2 py-1 rounded">Tin tức</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                            {item.publishdate ? formatDate(item.publishdate) : ""}
                        </div>
                        <div className="font-semibold mt-1" style={{ wordBreak: "break-word" }}>
                            {item.title}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsDetailSection;
