import JobBenefits from "./JobBenefits";
import JobDescription from "./JobDescription";
import JobEmployerInfo from "./JobEmployerInfo";
import JobGeneralInfo from "./JobGeneralInfo";
import JobInformation from "./JobInformation";
import JobRequirements from "./JobRequirements";

const JobsDetailPage = () => {
	return (
		<div className="mx-4">
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
