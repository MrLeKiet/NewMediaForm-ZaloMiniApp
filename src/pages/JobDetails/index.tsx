

import { Page, useNavigate } from "zmp-ui";
import JobBenefits from "./JobBenefits";
import JobDescription from "./JobDescription";
import JobEmployerInfo from "./JobEmployerInfo";
import JobGeneralInfo from "./JobGeneralInfo";
import JobRequirements from "./JobRequirements";
import { useJobDetail } from "./useJobDetails";

const JobsDetailPage = () => {
	const { job, loading, error } = useJobDetail();
	const navigate = useNavigate();

	return (
		<Page className="bg-[#f4f4f4] min-h-screen p-4 flex flex-col items-center" style={{ paddingTop: 'var(--safe-top)', paddingBottom: 'calc(20px + var(--navbar-height))' }}>
			<div className="w-full max-w-md">
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
				{error && <div className="text-red-500">{typeof error === "string" ? error : JSON.stringify(error)}</div>}
				{job && (
					<>
						<JobGeneralInfo job={job} />
						<div className="border-2 border-orange-500 rounded-lg mb-4">
							<div className="bg-white text-orange-500 font-bold text-center py-2 border-b border-orange-500">THÔNG TIN CHUNG</div>
							<div className="p-3 text-sm text-gray-800 space-y-2">
								<div><b>Ngày đăng tin:</b> {job.publishdate}</div>
								<div><b>Vị trí (mới):</b> {job.location}</div>
								<div><b>Cấp bậc:</b> {job.position}</div>
								<div><b>Yêu cầu giới tính:</b> {job.gender}</div>
								<div><b>Số lượng tuyển:</b> {job.numofrecruitment}</div>
								<div><b>Thời gian làm việc:</b> {job.workingtime || "Giờ hành chính"}</div>
								<div><b>Yêu cầu bằng cấp:</b> {job.degreerequired}</div>
								<div><b>Yêu cầu kinh nghiệm:</b> {job.experience || "Không yêu cầu kinh nghiệm"}</div>
								<div><b>Ngành nghề:</b> {job.job}</div>
								<div><b>Hạn nộp hồ sơ:</b> {job.deadline}</div>
							</div>
						</div>
						<JobEmployerInfo job={job} />
						<JobDescription job={job} />
						<JobRequirements job={job} />
						<JobBenefits job={job} />
					</>
				)}
			</div>
		</Page>
	);
};

export default JobsDetailPage;
