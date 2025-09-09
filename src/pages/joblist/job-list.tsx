import { Building } from "lucide-react";
import { useState } from "react";
import { Button, Input, Page, Select, useNavigate } from "zmp-ui";

const companies = [
    { label: "CÔNG TY TNHH TRÀ & CÀ PHÊ VIỆT NAM", value: "tra-ca-phe" },
    { label: "CÔNG TY TNHH DU LỊCH HOA TIÊU THANH ĐẶNG", value: "du-lich-thanh-dang" },
];

const jobs = [
    {
        id: 1,
        title: "Tuyển Dụng Trưởng Dây Chuyền Sản Xuất Sô Cô La",
        company: companies[0].label,
        logo: "https://via.placeholder.com/80x80?text=YOURCOMPANY",
        date: "09/09/2025",
    },
    {
        id: 2,
        title: "Tuyển Dụng Đợt 2 Tháng 9/2025",
        company: companies[1].label,
        logo: "https://via.placeholder.com/80x80?text=YOUR+COMPANY",
        date: "09/09/2025",
    },
];

const JobListPage = () => {
    const [keyword, setKeyword] = useState("");
    const [company, setCompany] = useState("");


    const navigate = useNavigate();
    const filteredJobs = jobs.filter(
        (job) =>
            (!keyword || job.title.toLowerCase().includes(keyword.toLowerCase())) &&
            (!company || job.company === companies.find((c) => c.value === company)?.label)
    );

    return (
        <Page className="bg-white min-h-screen p-4" style={{ paddingTop: 'var(--safe-top)', paddingBottom: 'var(--safe-bottom)' }}>
            <div className="mb-4">
                <div className="font-semibold mb-2">
                    Tuyển dụng người lao động Việt Nam vào các vị trí dự kiến tuyển dụng người lao động nước ngoài
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-end">
                    <Input
                        placeholder="Nhập từ khóa"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="w-full md:w-1/3"
                    />
                    <Select
                        placeholder="Chọn doanh nghiệp"
                        value={company}
                        onChange={(val) => setCompany(val as string || "")}
                        className="w-full md:w-1/3"
                    >
                        <option value="">Chọn doanh nghiệp</option>
                        {companies.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                    </Select>
                    <Button className="w-full md:w-auto bg-orange-400 text-white" type="highlight">
                        Tìm kiếm
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                {filteredJobs.map((job) => (
                    <button
                        key={job.id}
                        type="button"
                        className="flex flex-row items-start gap-4 border border-gray-300 rounded-lg p-4 bg-white shadow-sm h-36 cursor-pointer hover:shadow-md transition text-left focus:outline-none"
                        onClick={() => navigate("/job-detail")}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                navigate("/job-detail");
                            }
                        }}
                        tabIndex={0}
                    >
                        <img
                            src={job.logo}
                            alt="logo"
                            className="w-16 h-16 object-contain rounded bg-white border flex-shrink-0 mt-1"
                        />
                        <div className="flex-1 flex flex-col items-start min-w-0 justify-between h-full">
                            <div className="font-bold text-base mb-1 text-gray-950 w-full break-words">{job.title}</div>
                            <div className="flex items-start text-gray-500 text-sm font-semibold mb-1 w-full min-w-0 break-words">
                                <Building className="mr-1 w-5 h-5 min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] mt-0.5" />
                                <span className="break-words">{job.company}</span>
                            </div>
                            <div className="flex items-center text-gray-500 text-xs w-full mt-auto">
                                Ngày đăng tuyển: {job.date}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </Page>
    );
};

export default JobListPage;
