import { useQuery } from "react-query";
import { useParams } from "zmp-ui";
import { getJobDetails } from "./api";

export function useJobDetail() {
    const params = useParams();
    const id = params.id;
    const { data, isLoading: loading, error } = useQuery(
        ["job-detail", id],
        () => (id ? getJobDetails(id) : Promise.resolve(null)),
        {
            enabled: !!id,
            staleTime: 2 * 60 * 1000, // 2 minutes
            cacheTime: 30 * 60 * 1000, // 30 minutes
        }
    );
    return { job: data?.Data?.Data || null, loading, error };
}