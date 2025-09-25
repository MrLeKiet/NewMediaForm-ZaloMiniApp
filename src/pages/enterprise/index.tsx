import FilterBar from "@/components/FilterBar";
import { useFilterOptions } from "@/components/FiltterOptions";
import Navbar from "@/components/NavBar";
import RecruitmentCard from "@/components/RecruitmentCard";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Box, Page } from "zmp-ui";


interface Job {
    id: string;
    title: string;
    thumbnail: string;
    company: string;
    publishdate: string;
}

function EnterprisePage() {
    const [search, setSearch] = useState("");
    const [selectedFilter, setSelectedFilter] = useState<string>("");
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Filter options
    const { data: FilterOptionsData } = useFilterOptions();
    const FilterOptions = React.useMemo(() => [
        { label: "Tất cả", value: "" },
        ...(FilterOptionsData || [])
    ], [FilterOptionsData]);

    // Fetch jobs from API with both search and filter
    useEffect(() => {
        setLoading(true);
        if (searchTimeout.current) clearTimeout(searchTimeout.current);
        searchTimeout.current = setTimeout(async () => {
            try {
                const params: any = {
                    rowIndex: 0,
                    pageSize: 20,
                };
                if (search.trim()) {
                    params.keyword = search.trim();
                } else if (selectedFilter) {
                    params.enterprise = selectedFilter;
                }
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/RecruitmentForeigners`, {
                    params,
                    headers: { "Accept-Language": "2" },
                });
                setJobs(response.data?.Data?.Data || []);
            } catch {
                setJobs([]);
            } finally {
                setLoading(false);
            }
        }, 400); // debounce 400ms
        return () => {
            if (searchTimeout.current) clearTimeout(searchTimeout.current);
        };
    }, [search, selectedFilter]);

    return (

        <Box className="bg-[#f4f4f4] min-h-screen p-4 pb-12" style={{ paddingTop: 'var(--safe-top)', paddingBottom: '20%' }}>
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
                                        className="w-full pl-12 pr-4 py-3 shadow rounded-full bg-white focus:outline-gray-400 text-base placeholder-gray-400"
                                        aria-label="Tìm kiếm việc làm"
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* Filter bar under search bar */}
                            <div className="mt-2 rounded-xl shadow bg-white px-2 py-1">
                                <FilterBar
                                    options={FilterOptions}
                                    value={selectedFilter}
                                    onChange={setSelectedFilter}
                                    placeholder="Chọn doanh nghiệp"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                {(() => {
                    if (loading) {
                        return <p>Đang tìm kiếm...</p>;
                    }
                    if (jobs.length > 0) {
                        return (
                            <ul className="space-y-6">
                                {jobs.map((job) => (
                                    <RecruitmentCard
                                        key={job.id}
                                        id={job.id}
                                        title={job.title}
                                        thumbnail={job.thumbnail}
                                        company={job.company}
                                        publishdate={job.publishdate}
                                    />
                                ))}
                            </ul>
                        );
                    }
                    return <p>Không có dữ liệu tuyển dụng.</p>;
                })()}
            </div>
            <Navbar />
        </Box>
    );
}

export default EnterprisePage;
