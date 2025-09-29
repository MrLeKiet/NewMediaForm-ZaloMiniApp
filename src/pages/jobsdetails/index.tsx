
import { useEffect, useState } from "react";
import { Page, useNavigate, useParams } from "zmp-ui";

const JobsDetailPage = () => {
	const params = useParams();
	const id = params.id;
	const [job, setJob] = useState<any>(null);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		console.log("useParams in jobsdetail page:", params);
		if (!id) return;
		console.log("Navigating to jobsdetail page, fetching job with jodId:", id);
		setLoading(true);
		fetch(`${import.meta.env.VITE_API_BASE_URL}/GetJob?jodId=${id}`, {
			headers: {
				"Accept": "application/json",
				"Accept-Language": "2"
			}
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Job detail API response:", data);
				setJob(data?.Data?.Data || null);
				setLoading(false);
			})
			.catch(() => {
				setError("Lỗi khi tải chi tiết công việc.");
				setLoading(false);
			});
	}, [id]);

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
				{error && <div className="text-red-500">{error}</div>}
				{job && (
					<>
						<div className="bg-orange-500 rounded-lg p-3 mb-4 text-white shadow flex flex-col gap-1">
							<div className="flex items-center gap-2">
								<span className="font-bold text-base">VỊ TRÍ CÔNG VIỆC: {job.title}</span>
							</div>
							<div className="text-sm">{job.companyname}</div>
							<div className="text-xs">Vị trí: {job.location}</div>
							<div className="text-xs">Mức lương: {job.salary}</div>
							<div className="text-xs">Ngày hết hạn: {job.deadline}</div>
							<div className="text-xs">{job.viewcount || 0} lượt xem</div>
						</div>

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

						<div className="border-2 border-orange-500 rounded-lg mb-4">
							<div className="bg-white text-orange-500 font-bold text-center py-2 border-b border-orange-500">NHÀ TUYỂN DỤNG</div>
							<div className="p-3 text-sm text-gray-800 space-y-2">
								<div><b>Tên công ty:</b> {job.companyname}</div>
								<div><b>Địa chỉ:</b> {job.companyaddress}</div>
								<div><b>Quy mô:</b> {job.companyscale}</div>
								<button className="w-full bg-red-500 text-white font-bold py-2 rounded mt-2">Đăng Nhập Để Lấy Thông Tin Liên Hệ Và Nộp CV</button>
							</div>
						</div>

						<div className="border-2 border-orange-500 rounded-lg mb-4">
							<div className="bg-white text-orange-500 font-bold text-center py-2 border-b border-orange-500">MÔ TẢ CÔNG VIỆC</div>
							<div className="p-3 text-sm text-gray-800">
								<div dangerouslySetInnerHTML={{ __html: job.summary || "Chưa có mô tả." }} />
							</div>
						</div>

						<div className="border-2 border-orange-500 rounded-lg mb-4">
							<div className="bg-white text-orange-500 font-bold text-center py-2 border-b border-orange-500">YÊU CẦU CÔNG VIỆC</div>
							<div className="p-3 text-sm text-gray-800">
								<div dangerouslySetInnerHTML={{ __html: job.jobrequirements || "Chưa có yêu cầu." }} />
							</div>
						</div>

						<div className="border-2 border-orange-500 rounded-lg mb-4">
							<div className="bg-white text-orange-500 font-bold text-center py-2 border-b border-orange-500">CHẾ ĐỘ PHÚC LỢI</div>
							<div className="p-3 text-sm text-gray-800">
								<div dangerouslySetInnerHTML={{ __html: job.benefits || "Chưa có thông tin." }} />
							</div>
						</div>
					</>
				)}
			</div>
		</Page>
	);
};

export default JobsDetailPage;
