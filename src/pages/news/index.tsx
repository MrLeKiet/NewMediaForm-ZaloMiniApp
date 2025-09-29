import { useEffect, useState } from "react";
import { Page, useNavigate } from "zmp-ui";
import Navbar from "../../components/NavBar";

const NewsPage = () => {
  const [newsList, setNewsList] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/HotNewsHomePage?rowIndex=0&pageSize=5`, {
      headers: {
        "Accept": "application/json",
        "Accept-Language": "2"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setNewsList(data?.Data?.Data || []);
      });
  }, []);

  function formatDate(dateStr: string) {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      return `${parts[0]}/${parts[1]}/${parts[2]}`;
    }
    return dateStr;
  }

  return (
    <Page className="bg-[#f4f4f4] min-h-screen p-4" style={{ paddingTop: 'var(--safe-top)', paddingBottom: 'calc(20px + var(--navbar-height))' }}>
      <h1 className="text-2xl font-bold mb-4">Tin tức nổi bật</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {newsList.map((item: any) => (
          <button
            key={item.id}
            className="bg-white rounded shadow p-2 flex flex-col cursor-pointer text-left focus:outline-none"
            onClick={() => navigate(`/news/${item.id}`)}
            tabIndex={0}
            aria-label={item.title}
          >
            <div className="relative">
              {item.thumbnail && (
                <img src={item.thumbnail} alt={item.title} className="w-full h-32 object-cover rounded" />
              )}
              <span className="absolute top-2 left-2 bg-[#E53935] text-white text-xs px-2 py-1 rounded">Tin tức</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">{item.publishdate ? formatDate(item.publishdate) : ""}</div>
            <div className="font-semibold mt-1" style={{ wordBreak: 'break-word' }}>{item.title}</div>
          </button>
        ))}
      </div>
      <Navbar />
    </Page>
  );
}

export default NewsPage;