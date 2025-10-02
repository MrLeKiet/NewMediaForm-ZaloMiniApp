import { useQuery } from "react-query";
import { getJobList } from "../LaborerJobsList/api";

export function useJobsList(filters: any) {
    // Only send non-empty params
    const params: Record<string, string> = {};
    Object.keys(filters).forEach(key => {
        if (filters[key] !== "") {
            params[key] = filters[key];
        }
    });

    const { data, isLoading, error } = useQuery([
        "jobs-list",
        params,
    ], () => getJobList(params), {
        keepPreviousData: true,
        staleTime: 2 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
    });

    return {
        jobs: data || [],
        loading: isLoading,
        error,
    };
}
