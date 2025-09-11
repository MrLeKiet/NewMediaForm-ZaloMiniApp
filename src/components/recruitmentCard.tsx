import React from "react";

export interface RecruitmentCardProps {
	id: string;
	title: string;
	thumbnail: string;
	company: string;
	publishdate: string;
}

import { useNavigate } from "zmp-ui";

const RecruitmentCard: React.FC<RecruitmentCardProps> = ({ id, title, thumbnail, company, publishdate }) => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(`/detail/${id}`);
	};
	return (
		<li
			className="list-none"
		>
			<button
				type="button"
				className="bg-white w-full h-28 rounded-xl shadow-sm hover:shadow-lg transition text-left focus:outline-none focus:ring-gray-300 group relative cursor-pointer p-3"
				aria-label={`Chi tiết công việc: ${title}`}
				onClick={handleClick}
				style={{ touchAction: "manipulation" }}
			>
				<div className="flex flex-col gap-1">
					<div className="flex gap-3 items-start">
						{/* Logo / Thumbnail */}
						<div className="flex-shrink-0 w-14 h-14 rounded overflow-hidden bg-white border border-gray-200 flex items-center justify-center">
													<img
														src={thumbnail}
														alt={title}
														className="w-full h-full object-cover"
														onError={(e) =>
														((e.target as HTMLImageElement).src =
															import.meta.env.VITE_PLACEHOLDER_IMG)
														}
							/>
						</div>

						{/* Title and company */}
						<div className="flex-1 min-w-0 gap-1">
							<div className="font-semibold text-[16px] text-gray-900 line-clamp-2">
								{title}
							</div>
							<div className="text-xs text-gray-500 truncate line-clamp-2">
								{company}
							</div>
							<span className="text-xs text-gray-500 truncate">
								Ngày đăng: {publishdate}
							</span>
						</div>
					</div>
				</div>
			</button>
		</li>
	);
};

export default RecruitmentCard;
