import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Page, useNavigate } from "zmp-ui";
import { companyOptions } from "../../constants/companyOptions";
import CompanySelect from "./CompanySelect";

const companies = [
    { label: "CÔNG TY TNHH TRÀ & CÀ PHÊ VIỆT NAM", value: "tra-ca-phe" },
    { label: "CÔNG TY TNHH DU LỊCH HOA TIÊU THANH ĐẶNG", value: "du-lich-thanh-dang" },
];

const jobs = [
    {
        id: 1,
        title: "Tuyển Dụng Trưởng Dây Chuyền Sản Xuất Sô Cô La",
        company: companies[0].label,
        logo: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/thinking-cat-douglas-sacha.jpg",
        date: "09/09/2025",
    },
];

const JobListPage = () => {
    const [selectedCompany, setSelectedCompany] = useState("all");
    const [keyword, setKeyword] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [displayedJobs, setDisplayedJobs] = useState(8);
    const loaderRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Simulate loading
    useEffect(() => {
        setLoading(true);
        const t = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(t);
    }, [keyword, selectedType]);

    // Infinite scroll
    useEffect(() => {
        if (!loaderRef.current) return;
        const handleScroll = () => {
            if (loaderRef.current) {
                const { top } = loaderRef.current.getBoundingClientRect();
                if (top < window.innerHeight + 100) {
                    setDisplayedJobs((prev) => prev + 4);
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Filter jobs by selected company label
    const filteredJobs = selectedCompany === "all"
        ? jobs
    : jobs.filter(job => job.company === (companyOptions.find(o => o.value === selectedCompany)?.label || selectedCompany));

    // Save recent searches
    const handleSearch = (val: string) => {
        setKeyword(val);
        if (val && !recentSearches.includes(val)) {
            setRecentSearches([val, ...recentSearches.slice(0, 4)]);
        }
    };

    // Company avatar fallback (square)
    const getAvatar = (logo: string, company: string) => {
        if (logo) return <img src={logo} alt="logo" className="w-16 h-16 object-contain rounded bg-white border border-gray-200 shadow-sm flex-shrink-0" />;
        const initials = company.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
        return <div className="w-16 h-16 rounded bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xl border border-gray-200 shadow-sm">{initials}</div>;
    };

    return (
        <Page className="bg-[#f4f4f4] min-h-screen p-4" style={{ paddingTop: 'var(--safe-top)', paddingBottom: 'var(--safe-bottom)' }}>
            <div className="mb-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-end">
                    <div className="pt-2 pb-2 md:px-0">
                        <div className="flex flex-col gap-3 max-w-2xl mx-auto">
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold">Việc làm</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative flex-1">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm việc làm...."
                                        value={keyword}
                                        onChange={e => handleSearch(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-full bg-white shadow-sm focus:outline-sky-600 text-base placeholder-gray-400"
                                        aria-label="Tìm kiếm việc làm"
                                    />
                                </div>
                            </div>
                            {/* Recent search suggestions */}
                            {recentSearches.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-1 ">
                                    {recentSearches.map((s) => (
                                        <button key={s} className="px-3 py-1 rounded-full bg-gray-50 text-gray-500 text-xs hover:bg-gray-100 transition " onClick={() => setKeyword(s)}>{s}</button>
                                    ))}
                                </div>
                            )}

                            {/* Company filter bottom sheet */}
                            <div className="mt-2">
                                <CompanySelect value={selectedCompany} onChange={setSelectedCompany} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                {(() => {
                    if (loading) {
                        return Array.from({ length: 4 }).map((_, i) => {
                            const uniqueKey = `skeleton-${Date.now()}-${i}`;
                            return (
                                <div key={uniqueKey} className="flex flex-col bg-white rounded-xl shadow-sm animate-pulse">
                                    <div className="flex flex-row items-start gap-2 flex-1 pt-4 pb-4 px-4">
                                        <div className="w-16 h-16 rounded-full bg-gray-200" />
                                        <div className="flex-1 flex flex-col gap-2">
                                            <div className="h-4 w-2/3 bg-gray-200 rounded" />
                                            <div className="h-3 w-1/2 bg-gray-100 rounded" />
                                            <div className="h-3 w-1/3 bg-gray-100 rounded" />
                                        </div>
                                    </div>
                                </div>
                            );
                        });
                    } else if (filteredJobs.length === 0) {
                        return (
                            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                                <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14v2m0 4a8 8 0 100-16 8 8 0 000 16zm0-6a2 2 0 110-4 2 2 0 010 4z" /></svg>
                                <div className="text-lg font-semibold mb-2">Không tìm thấy công việc phù hợp</div>
                                <div className="text-sm">Hãy thử từ khóa khác hoặc kiểm tra lại bộ lọc.</div>
                            </div>
                        );
                    } else {
                        return filteredJobs.slice(0, displayedJobs).map((job, idx) => {
                            let typeLabel = '';
                            return (
                                <button
                                    key={job.id}
                                    type="button"
                                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition text-left focus:outline-none focus:ring-gray-300 group relative cursor-pointer p-3 mb-3"
                                    aria-label={`Chi tiết công việc: ${job.title}`}
                                    onClick={() => navigate("/job-detail")}
                                    style={{ touchAction: 'manipulation' }}
                                >
                                    <div className="flex flex-col gap-1">
                                        <div className="flex gap-3 items-start">
                                            {/* Logo */}
                                            <div className="flex-shrink-0 w-14 h-14 rounded overflow-hidden bg-white border border-gray-200 flex items-center justify-center">
                                                {getAvatar(job.logo, job.company)}
                                            </div>
                                            {/* Title and company */}
                                            <div className="flex-1 min-w-0 gap-1">
                                                <div className="font-semibold text-[16px] text-gray-900 line-clamp-2">{job.title}</div>
                                                <div className="text-xs text-gray-500 truncate line-clamp-1">{job.company}</div>
                                                <span className="text-xs text-gray-500 truncate ">{"Ngày đăng tuyển: " + job.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        });
                    }
                })()}
                {/* Infinite scroll loader */}
                <div ref={loaderRef} className="flex justify-center py-4">
                    {displayedJobs < filteredJobs.length && !loading && (
                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    )}
                </div>
            </div>
        </Page>
    );
};

export default JobListPage;