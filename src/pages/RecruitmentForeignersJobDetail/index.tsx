

import { Page, useNavigate } from "zmp-ui";
import JobDetailInfo from "./JobDetailInfo";
import { useRecruitmentJobDetail } from "./useRecruitmentForeignersJobDetail";

function JobDetailPage() {
    const navigate = useNavigate();
    const { job, error, loading } = useRecruitmentJobDetail();

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
                {loading && <div>Đang tải chi tiết...</div>}
                {error && <div className="text-red-500">Lỗi khi tải chi tiết công việc.</div>}
                {job && <JobDetailInfo job={job} />}
            </div>
        </Page>
    );
}

export default JobDetailPage;
