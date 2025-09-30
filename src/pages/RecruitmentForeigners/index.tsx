import Navbar from "@/components/NavBar";
import FilterBar from "@/pages/RecruitmentForeigners/FilterBar.js";
import RecruitmentCard from "@/pages/RecruitmentForeigners/RecruitmentCard.js";
import React from "react";
import { Box } from "zmp-ui";
import { useRecruitmentJobs } from "./useRecruitmentForeigners.js";

function EnterprisePage() {
    const {
        search,
        setSearch,
        selectedFilter,
        setSelectedFilter,
        jobs,
        loading,
        FilterOptions
    } = useRecruitmentJobs();

    const [showNavbar, setShowNavbar] = React.useState(true);
    const [visibleCount, setVisibleCount] = React.useState(10);
    const listRef = React.useRef<HTMLDivElement>(null);

    // Reset visibleCount when jobs change (e.g., new search/filter)
    React.useEffect(() => {
        setVisibleCount(10);
    }, [jobs]);

    // Infinite scroll handler
    React.useEffect(() => {
        const handleScroll = () => {
            const el = listRef.current;
            if (!el) return;
            if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
                // Near bottom, load more
                setVisibleCount((prev) => (prev < jobs.length ? prev + 10 : prev));
            }
        };
        const el = listRef.current;
        if (el) {
            el.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (el) {
                el.removeEventListener('scroll', handleScroll);
            }
        };
    }, [jobs.length]);

    return (
        <Box className="bg-[#f4f4f4] flex flex-col" style={{ height: '100vh', overflow: 'hidden', paddingTop: 'var(--safe-top)' }}>
            {/* Fixed header: search and filter */}
            <div className="p-4 mb-0 sticky top-0 bg-[#f4f4f4] z-10">
                <div className="flex flex-col gap-2 md:flex-row md:items-end">
                    <div className="pt-2 pb-2 md:px-0">
                        <div className="flex flex-col gap-3 max-w-2xl mx-auto">
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold">Việc làm</div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative flex-1">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <circle cx="11" cy="11" r="8" />
                                            <path d="M21 21l-4.35-4.35" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm việc làm...."
                                        className="w-full pl-12 pr-4 py-3 shadow rounded-full bg-white focus:outline-gray-400 text-base placeholder-gray-400"
                                        aria-label="Tìm kiếm việc làm"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mt-2 rounded-xl shadow bg-white px-2 py-1">
                                <FilterBar
                                    options={FilterOptions}
                                    value={selectedFilter}
                                    onChange={setSelectedFilter}
                                    placeholder="Chọn doanh nghiệp"
                                    onOpen={() => setShowNavbar(false)}
                                    onClose={() => setShowNavbar(true)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="flex-1 overflow-y-auto"
                style={{ maxHeight: `calc(100vh - var(--safe-top) - ${showNavbar ? 'var(--navbar-height)' : '0px'} - 120px)`, paddingBottom: 'var(--navbar-height)' }}
                ref={listRef}
            >
                {(() => {
                    if (loading) {
                        return <p>Đang tìm kiếm...</p>;
                    }
                    if (jobs.length > 0) {
                        return (
                            <ul className="space-y-3 px-4">
                                {jobs.slice(0, visibleCount).map((job) => (
                                    <RecruitmentCard
                                        key={job.id}
                                        id={job.id}
                                        title={job.title}
                                        thumbnail={job.thumbnail}
                                        company={job.company}
                                        publishdate={job.publishdate}
                                    />
                                ))}
                                {visibleCount < jobs.length && (
                                    <li className="text-center text-gray-400 py-2">Đang tải thêm...</li>
                                )}
                            </ul>
                        );
                    }
                    return <p className="px-4">Không có dữ liệu tuyển dụng.</p>;
                })()}
            </div>
            {showNavbar && <Navbar />}
        </Box>
    );
}

export default EnterprisePage;