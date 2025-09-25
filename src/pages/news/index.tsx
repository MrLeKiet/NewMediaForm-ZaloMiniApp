import { Page } from "zmp-ui";
import Navbar from "../../components/NavBar";

function NewsPage() {
  return (
    <Page className="bg-[#f4f4f4] min-h-screen p-4" style={{ paddingTop: 'var(--safe-top)', paddingBottom: 'var(--safe-bottom)' }}>
      
      <Navbar />
    </Page>
  );
}

export default NewsPage;