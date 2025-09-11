
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Page, useNavigate } from "zmp-ui";

const fetchJobDetail = async (id: string) => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/GetRecruitmentForeigner?jodId=${id}`,
        {
            headers: {
                "Accept-Language": "2",
            },
        }
    );
    return response.data;
};

function JobDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading } = useQuery(
        ["jobDetail", id],
        () => id ? fetchJobDetail(id) : Promise.resolve(undefined),
        { enabled: !!id }
    );

    const job = data?.Data?.Data;
    const detail = job?.detailjob?.[0];

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
                {isLoading && <div>Đang tải chi tiết...</div>}
                {error && <div className="text-red-500">Lỗi khi tải chi tiết công việc.</div>}
                {job && (
                    <>
                        <div className="font-bold text-xl mb-4 text-gray-800">{job.title}</div>
                        <div className="text-base text-gray-700 font-semibold mb-1 flex items-center">{job.companyname}</div>
                        <div className="text-gray-500 text-sm mb-4">Ngày đăng: {job.publishdate}</div>
                        <div className="relative rounded-lg bg-white p-4 shadow-lg mt-6" style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0,0.15)' }}>
                            <div className="absolute left-0 top-0 w-full h-1 rounded-t-lg bg-orange-500" style={{ borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }} />
                            <div className="font-bold text-orange-500 mb-2 mt-2">{detail?.position || "Chi tiết công việc"}</div>
                            <ul className="text-gray-800 text-sm space-y-1">
                                {detail && (
                                    <>
                                        <li><b>Chức danh công việc:</b> {detail.jobtitle}</li>
                                        <li><b>Số lượng:</b> {detail.quantity}</li>
                                        <li><b>Thời hạn làm việc:</b> {detail.workingtime}</li>
                                        <li><b>Địa điểm làm việc:</b> {detail.location}</li>
                                        <li><b>Trình độ:</b> {detail.level}</li>
                                        <li><b>Lương:</b> {detail.salary}</li>
                                        <li><b>Kinh nghiệm:</b> {detail.experience}</li>
                                        <li><b>Mô tả:</b> <span dangerouslySetInnerHTML={{ __html: detail.summary }} /></li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </Page>
    );
};

export default JobDetailPage;
