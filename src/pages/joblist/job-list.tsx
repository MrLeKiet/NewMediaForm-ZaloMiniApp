import { useState } from "react";
import { Button, Page, useNavigate } from "zmp-ui";

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
        location: "Hà Nội",
    },
    {
        id: 2,
        title: "Tuyển Dụng Đợt 2 Tháng 9/2025",
        company: companies[1].label,
        logo: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/thinking-cat-douglas-sacha.jpg",
        date: "09/09/2025",
        location: "Hồ Chí Minh",
    },
    {
        id: 3,
        title: "Nhân Viên Kỹ Thuật Điện",
        company: "CÔNG TY TNHH KỸ THUẬT SỐ 1",
        logo: "https://randomuser.me/api/portraits/men/32.jpg",
        date: "10/09/2025",
        location: "Đà Nẵng",
    },
    {
        id: 4,
        title: "Chuyên Viên Marketing Online",
        company: "CÔNG TY CỔ PHẦN TRUYỀN THÔNG ABC",
        logo: "https://randomuser.me/api/portraits/women/44.jpg",
        date: "08/09/2025",
        location: "Hà Nội",
    },
    {
        id: 5,
        title: "Lập Trình Viên ReactJS",
        company: "CÔNG TY PHẦN MỀM XYZ",
        logo: "https://randomuser.me/api/portraits/men/65.jpg",
        date: "07/09/2025",
        location: "Hồ Chí Minh",
    },
    {
        id: 6,
        title: "Nhân Viên Bán Hàng Siêu Thị",
        company: "SIÊU THỊ BIGMART",
        logo: "https://randomuser.me/api/portraits/women/12.jpg",
        date: "06/09/2025",
        location: "Cần Thơ",
    },
    {
        id: 7,
        title: "Tài Xế Xe Tải",
        company: "CÔNG TY VẬN TẢI NAM BẮC",
        logo: "https://randomuser.me/api/portraits/men/77.jpg",
        date: "05/09/2025",
        location: "Bình Dương",
    },
    {
        id: 8,
        title: "Nhân Viên Chăm Sóc Khách Hàng",
        company: "CÔNG TY DỊCH VỤ KHÁCH HÀNG 24H",
        logo: "https://randomuser.me/api/portraits/women/23.jpg",
        date: "04/09/2025",
        location: "Hà Nội",
    },
];

const JobListPage = () => {
    const [keyword, setKeyword] = useState("");



    const navigate = useNavigate();
    const filteredJobs = jobs.filter(
        (job) =>
            !keyword || job.title.toLowerCase().includes(keyword.toLowerCase())
    );

    return (
        <Page className="bg-[#f4f4f4] min-h-screen p-4" style={{ paddingTop: 'var(--safe-top)', paddingBottom: 'var(--safe-bottom)' }}>
            <div className="mb-4 pt-10">
                <div className="flex flex-col gap-2 md:flex-row md:items-end">
                    <div className="pt-2 pb-2 md:px-0">
                        <div className="flex flex-col gap-3 max-w-2xl mx-auto">
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold">Việc làm</div>
                                <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow text-gray-500 hover:bg-gray-100">
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
                                        onChange={e => setKeyword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-full bg-white shadow-sm border-0 focus:ring-2 focus:ring-orange-300 text-base placeholder-gray-400"
                                    />
                                </div>
                                <Button className="w-12 h-12 rounded-full bg-orange-400 text-white flex items-center justify-center shadow-none text-xl p-0 min-w-0" type="highlight">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                                </Button>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <button className="px-5 py-2 rounded-full bg-black text-white font-semibold text-sm shadow transition">All</button>
                                <button className="px-5 py-2 rounded-full bg-white text-gray-700 font-semibold text-sm border border-gray-200 shadow-sm transition">Web Developer</button>
                                <button className="px-5 py-2 rounded-full bg-white text-gray-700 font-semibold text-sm border border-gray-200 shadow-sm transition">Software Engineer</button>
                                <button className="px-5 py-2 rounded-full bg-white text-gray-700 font-semibold text-sm border border-gray-200 shadow-sm transition">Designer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                {filteredJobs.map((job, idx) => (
                    <button
                        key={job.id}
                        type="button"
                        className="flex flex-col cursor-pointer hover:shadow-md transition text-left focus:outline-none"
                        onClick={() => navigate("/job-detail")}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                navigate("/job-detail");
                            }
                        }}
                        tabIndex={0}
                    >
                        <div className="flex flex-row items-start gap-2 flex-1 pt-2 pb-2">
                            <img
                                src={job.logo}
                                alt="logo"
                                className="w-20 h-20 object-contain rounded bg-white border flex-shrink-0"
                            />
                            <div className="flex-1 flex flex-col items-start min-w-0">
                                <div className="font-bold text-[16px] mb-1 text-gray-950 w-full break-words">{job.title}</div>
                                <div className="text-gray-500 text-xs font-semibold mb-1 w-full min-w-0 break-words">
                                    {job.company}
                                </div>
                                <div className="inline-block px-2 py-0.5 mb-1 rounded-full bg-gray-200 text-gray-700 text-xs font-medium">
                                    {job.location}
                                </div>
                                <div className="flex items-start text-gray-500 text-xs w-full mb-1">
                                    Ngày đăng tuyển: {job.date}
                                </div>
                            </div>
                        </div>
                        {idx !== filteredJobs.length - 1 && (
                            <div className="border-[1px] border-gray-200 h-[1px] w-full" />
                        )}
                    </button>
                ))}
            </div>
        </Page>
    );
};

export default JobListPage;