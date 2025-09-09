import { Page, useNavigate } from "zmp-ui";

const jobDetail = {
    title: "Tuyển dụng đợt 7 tháng 08/2025",
    company: "Công ty TNHH Pegas Việt Nam - Chi nhánh Cam Ranh",
    date: "05/09/2025",
    sectionTitle: "LAO ĐỘNG KỸ THUẬT",
    details: [
        "- Chức danh công việc: Nhân viên Hoạt não Giải trí",
        "- Số lượng (người): 9",
        "- Thời hạn làm việc: 10/10/2025 đến 09/10/2027",
        "- Địa điểm làm việc: Km20 Nguyễn Tất Thành, xã Cam Lâm, tỉnh Khánh Hòa, , Tỉnh Khánh Hòa",
        "- Địa điểm làm việc theo địa chỉ mới: Km20 Nguyễn Tất Thành, Xã Cam Lâm, Khánh Hòa",
        "- Yêu cầu về trình độ: Không có trình độ CMKT",
        "- Mức lương (đồng/tháng): 20000000",
        "- Mức ăn ở và sinh hoạt: Từ 2 - 5 năm",
        "- Nội dung công việc, chi tiết công việc: - Tổ chức hoạt động vui chơi giải trí cho khách, Thợ Nhí Kỹ",
        "- Hỗ trợ ngôn ngữ: Thợ Nhí Kỹ hoặc lao động hỗ trợ vui chơi, giải trí",
        "- Thành thạo giao tiếp tiếng Nga, Tiếng Thợ Nhí Kỹ"
    ]
};

const JobDetailPage = () => {
    const navigate = useNavigate();
    return (
        <Page className="bg-white min-h-screen p-4 flex flex-col items-center" style={{ paddingTop: 'var(--safe-top)', paddingBottom: 'var(--safe-bottom)' }}>
            <div className="w-full max-w-md relative">
                <button
                    className="flex items-center pt-2 text-gray-600 hover:text-orange-500 focus:outline-none mb-3"
                    onClick={() => navigate(-1)}
                    aria-label="Quay lại"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    <span className="ml-1 text-sm font-medium">Quay lại</span>
                </button>
                <div className="font-bold text-xl mb-4 text-gray-800">{jobDetail.title}</div>
            <div className="text-base text-gray-700 font-semibold mb-1 flex items-center">
                {jobDetail.company}
            </div>
            <div className="text-gray-500 text-sm mb-4">Ngày duyệt đăng tuyển: {jobDetail.date}</div>
            <div className="relative rounded-lg bg-white p-4 shadow-lg mt-6" style={{boxShadow: '0 4px 16px 0 rgba(0,0,0,0.15)'}}>
                <div className="absolute left-0 top-0 w-full h-1 rounded-t-lg bg-orange-500" style={{borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem'}} />
                <div className="font-bold text-orange-500 mb-2 mt-2">{jobDetail.sectionTitle}</div>
                <ul className="text-gray-800 text-sm space-y-1">
                    {jobDetail.details.map((item, idx) => (
                        <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                </ul>
            </div>
            </div>
        </Page>
    );
};

export default JobDetailPage;
