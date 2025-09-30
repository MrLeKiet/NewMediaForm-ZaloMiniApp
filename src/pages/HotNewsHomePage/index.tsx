
import { Page, useNavigate } from "zmp-ui";
import Navbar from "../../components/NavBar";
import NewsCard from "./NewsCard";
import { useHotNews } from "./useHotNews";

const NewsPage = () => {
  const { news, loading, error } = useHotNews();
  const navigate = useNavigate();

  const handleNewsClick = (id: string) => {
    navigate(`/news/${id}`);
  };

  return (
    <Page className="bg-[#f4f4f4] min-h-screen p-4" style={{ paddingTop: 'var(--safe-top)', paddingBottom: 'calc(20px + var(--navbar-height))' }}>
      <h1 className="text-2xl font-bold mb-4">Tin tức nổi bật</h1>
      {loading && <div>Đang tải tin tức...</div>}
      {error && <div className="text-red-500">Lỗi khi tải tin tức.</div>}
      {!loading && !error && news && (
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
      <Navbar />
    </Page>
  );
};

export default NewsPage;