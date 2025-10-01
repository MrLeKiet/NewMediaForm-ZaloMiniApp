import JobBenefits from "./JobBenefits";
import JobDescription from "./JobDescription";
import JobEmployerInfo from "./JobEmployerInfo";
import JobGeneralInfo from "./JobGeneralInfo";
import JobInformation from "./JobInformation";
import JobRequirements from "./JobRequirements";

const JobsDetailPage = () => {
	return (
		<div className="flex flex-col gap-4 px-4 pb-4">
			<JobGeneralInfo />
			<JobInformation />
			<JobEmployerInfo />
			<JobDescription />
			<JobRequirements />
			<JobBenefits />
		</div>
	);
};

export default JobsDetailPage;
