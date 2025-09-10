import { Briefcase, Loader2, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button, Page, useNavigate } from "zmp-ui";
import CompanySelect from "./CompanySelect";

const companies = [
    { label: "CÔNG TY TNHH TRÀ & CÀ PHÊ VIỆT NAM", value: "tra-ca-phe" },
    { label: "CÔNG TY TNHH DU LỊCH HOA TIÊU THANH ĐẶNG", value: "du-lich-thanh-dang" },
];

const jobTypes = [
    { label: "Tất cả", value: "all" },
    { label: "Full-time", value: "fulltime" },
    { label: "Part-time", value: "parttime" },
    { label: "Remote", value: "remote" },
];

const jobs = [
    {
        id: 1,
        title: "Tuyển Dụng Trưởng Dây Chuyền Sản Xuất Sô Cô La",
        company: companies[0].label,
        logo: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/thinking-cat-douglas-sacha.jpg",
        date: "09/09/2025",
        location: "Hà Nội",
        type: "fulltime",
        salary: "20-30 triệu",
        rating: 4.5,
        expired: false,
        negotiable: false,
        applied: false,
        saved: false,
        views: 120,
        applicants: 12,
        description: "Quản lý dây chuyền sản xuất sô cô la, đảm bảo chất lượng và tiến độ sản xuất.",
    },
    {
        id: 5,
        title: "Lập Trình Viên ReactJS",
        company: "CÔNG TY PHẦN MỀM XYZ",
        logo: "https://randomuser.me/api/portraits/men/65.jpg",
        date: "07/09/2025",
        location: "Hồ Chí Minh",
        type: "remote",
        salary: "25 triệu",
        rating: 4.7,
        expired: false,
        negotiable: false,
        applied: false,
        saved: false,
        views: 200,
        applicants: 20,
        description: "Phát triển giao diện web với ReactJS, làm việc cùng đội ngũ kỹ thuật năng động.",
    },
    {
        id: 6,
        title: "Nhân Viên Bán Hàng Siêu Thị",
        company: "SIÊU THỊ BIGMART",
        logo: "https://randomuser.me/api/portraits/women/12.jpg",
        date: "06/09/2025",
        location: "Cần Thơ",
        type: "parttime",
        salary: null,
        rating: 3.5,
        expired: false,
        negotiable: true,
        applied: false,
        saved: false,
        views: 30,
        applicants: 1,
        description: "Bán hàng, tư vấn sản phẩm cho khách tại siêu thị, làm việc theo ca.",
    },
    {
        id: 7,
        title: "Tài Xế Xe Tải",
        company: "CÔNG TY VẬN TẢI NAM BẮC",
        logo: "https://randomuser.me/api/portraits/men/77.jpg",
        date: "05/09/2025",
        location: "Bình Dương",
        type: "fulltime",
        salary: "12-15 triệu",
        rating: 4.1,
        expired: false,
        negotiable: false,
        applied: false,
        saved: false,
        views: 50,
        applicants: 3,
        description: "Lái xe tải vận chuyển hàng hóa liên tỉnh, đảm bảo an toàn và đúng tiến độ.",
    }
];

const JobListPage = () => {
    const [selectedCompany, setSelectedCompany] = useState("all");
    const [keyword, setKeyword] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [favorites, setFavorites] = useState<number[]>([]);
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

    // Filter jobs
    // No filter: show all jobs
    const filteredJobs = jobs;

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
            <div className="mb-4 pt-10">
                <div className="flex flex-col gap-2 md:flex-row md:items-end">
                    <div className="pt-2 pb-2 md:px-0">
                        <div className="flex flex-col gap-3 max-w-2xl mx-auto">
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold">Việc làm</div>
                                <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow text-gray-500 hover:bg-gray-100" aria-label="Thông báo">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </button>
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
                                        className="w-full pl-12 pr-4 py-3 rounded-full bg-white shadow-sm border-0 focus:ring-gray-500 text-base placeholder-gray-400"
                                        aria-label="Tìm kiếm việc làm"
                                    />
                                </div>
                                <Button className="w-12 h-12 rounded-full bg-gray-400 text-white flex items-center justify-center shadow-none text-xl p-0 min-w-0" type="highlight" aria-label="Tìm kiếm">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                                </Button>
                            </div>
                            {/* Recent search suggestions */}
                            {recentSearches.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {recentSearches.map((s) => (
                                        <button key={s} className="px-3 py-1 rounded-full bg-gray-50 text-gray-500 text-xs hover:bg-gray-100 transition" onClick={() => setKeyword(s)}>{s}</button>
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
                            if (job.type === 'fulltime') typeLabel = 'Full-time';
                            else if (job.type === 'parttime') typeLabel = 'Part-time';
                            else if (job.type === 'remote') typeLabel = 'Remote';
                            return (
                                <button
                                    key={job.id}
                                    type="button"
                                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition text-left focus:outline-none focus:ring-2 focus:ring-gray-300 group relative cursor-pointer p-3 mb-3"
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
                                            <div className="flex-1 min-w-0">
                                                <div className="font-semibold text-[16px] text-gray-900 line-clamp-2">{job.title}</div>
                                                <div className="text-xs text-gray-500 truncate mb-1">{job.company}</div>

                                            </div>
                                        </div>
                                        <div>
                                            {/* Filter chips */}
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                <span className="px-3 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium flex items-center gap-1">
                                                    <MapPin className="w-3 h-3" /> {job.location}
                                                </span>
                                                {typeLabel && (
                                                    <span className="px-3 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium flex items-center gap-1">
                                                        <Briefcase className="w-3 h-3" /> {typeLabel}
                                                    </span>
                                                )}
                                            </div>
                                            {/* Meta info and Apply button */}
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex gap-3 text-xs text-gray-500">
                                                    {/* <span>{job.date || '2 days ago'}</span> */}
                                                    <span>{job.views || 220} Views</span>
                                                    <span>{job.applicants || 13} Applicants</span>
                                                </div>
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