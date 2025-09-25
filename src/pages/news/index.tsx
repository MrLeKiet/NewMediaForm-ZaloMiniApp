import { Page } from "zmp-ui";
import Navbar from "../../components/NavBar";

function NewsPage() {
  return (
    <Page className="bg-[#f4f4f4] min-h-screen p-4" style={{ paddingTop: 'var(--safe-top)', paddingBottom: 'var(--safe-bottom)' }}>
      <h1 className="text-2xl font-bold mb-4">Tin tức - Sự kiện</h1>
      <Navbar />
    </Page>
  );
}

export default NewsPage;