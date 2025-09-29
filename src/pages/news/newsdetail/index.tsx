import { useEffect, useState } from "react";
import { Page, useNavigate, useParams } from "zmp-ui";

const NewsDetailPage = () => {
    const { id } = useParams();
    const [news, setNews] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        fetch(`${import.meta.env.VITE_API_BASE_URL}/GetNews?newsId=${id}`, {
            headers: {
                Accept: "application/json",
                "Accept-Language": "2",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setNews(data?.Data?.Data || null);
            });
    }, [id]);

    function formatDate(dateStr: string) {
        const parts = dateStr.split("/");
        if (parts.length === 3) {
            return `${parts[0]}/${parts[1]}/${parts[2]}`;
        }
        return dateStr;
    }

    // Decode HTML entities
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
    return (
        <Page
            className="bg-[#f4f4f4] min-h-screen p-4"
            style={{
                paddingTop: "var(--safe-top)",
                paddingBottom: "calc(20px + var(--navbar-height))",
            }}
        >
            {news && (
                <>
                    <button
                        className="flex items-center pt-2 text-gray-600 hover:text-orange-500 focus:outline-none mb-3"
                        onClick={() => navigate(-1)}
                        aria-label="Quay lại"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                        </svg>
                        <span className="ml-1 text-sm font-medium">Quay lại</span>
                    </button>

                    <h1 className="text-2xl font-bold">{news.title}</h1>

                    <div className="flex items-center gap-2 text-[#FFA726] text-sm mb-2">
                        {news.publishdate ? formatDate(news.publishdate) : ""}
                    </div>
                    
                    <div
                        className="text-sm text-black mb-4"
                        style={{}}
                    >
                        <div
                            className="news-detail-content"
                            dangerouslySetInnerHTML={{
                                __html: decodeAndFixImages(news.description)
                            }}
                        />
                        <style>
                            {`
                                .news-detail-content img {
                                    max-width: 100%;
                                    max-height: 100%;
                                    width: auto !important;
                                    height: auto !important;
                                    display: block;
                                    margin: 0 auto;
                                }
                            `}
                        </style>
                    </div>

                    <div className="text-lg font-bold mb-2">Bài viết liên quan</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {news.relatedNews?.map((item: any) => (
                            <div
                                key={item.id}
                                className="bg-white rounded shadow p-2 flex flex-col"
                            >
                                <div className="relative">
                                    {item.thumbnail && (
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-full h-32 object-cover rounded"
                                        />
                                    )}
                                    <span className="absolute top-2 left-2 bg-[#E53935] text-white text-xs px-2 py-1 rounded">
                                        Tin tức
                                    </span>
                                </div>
                                <div className="text-xs text-gray-500 mt-2">
                                    {item.publishdate ? formatDate(item.publishdate) : ""}
                                </div>
                                <div
                                    className="font-semibold mt-1"
                                    style={{ wordBreak: "break-word" }}
                                >
                                    {item.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </Page>
    );
};

export default NewsDetailPage;
