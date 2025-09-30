import MainLayout from "@/layouts/MainLayout";
import JobBenefits from "./JobBenefits";
import JobDescription from "./JobDescription";
import JobEmployerInfo from "./JobEmployerInfo";
import JobGeneralInfo from "./JobGeneralInfo";
import JobInformation from "./JobInformation";
import JobRequirements from "./JobRequirements";

const JobsDetailPage = () => {
	return (
		<MainLayout>
			<JobGeneralInfo />
			<JobInformation />
			<JobEmployerInfo />
			<JobDescription />
			<JobRequirements />
			<JobBenefits />
		</MainLayout>
	);
};

export default JobsDetailPage;
