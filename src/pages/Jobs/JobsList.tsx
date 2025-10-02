import Card from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import { useNavigate } from "react-router-dom";
import { useJobList } from "../LaborerJobsList/useLaborerJobsList";

const JobsList = ({ filters }: any) => {
  const { jobs, loading, error } = useJobList(filters);
  const navigate = useNavigate();

  if (loading) return <Skeleton />;
  if (error) return <div>Lỗi tải danh sách việc làm.</div>;
  if (!jobs.length) return <div>Không có việc làm phù hợp.</div>;

  return (
    <div className="flex flex-col gap-2">
      {jobs.map((item: any) => (
        <Card
          key={item.id}
          thumbnail={item.avatar}
          onClick={() => navigate(`/job-details/${item.id}`)}
        >
          <div>{item.title}</div>
          <div>{item.company}</div>
        </Card>
      ))}
    </div>
  );
};

export default JobsList;
