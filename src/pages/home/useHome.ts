
import { useQuery } from "react-query";
import { getHotNewsList, getLaboreList, getUrgentJobRecruitment } from "./api";


export function useUrgentJobs() {
    const { data, isLoading: loading, error } = useQuery(
        ["urgent-jobs"],
        getUrgentJobRecruitment,
        {
            staleTime: 2 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );
    return { jobs: data?.Data?.Data || [], loading, error };
}


export function useHotNews() {
    const { data, isLoading: loading, error } = useQuery(
        ["hot-news"],
        getHotNewsList,
        {
            staleTime: 2 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );
    return { news: data?.Data?.Data || [], loading, error };
}


export function useLabore() {
    const { data, isLoading: loading, error } = useQuery(
        ["labore-list"],
        getLaboreList,
        {
            staleTime: 2 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );
    return { labores: data?.Data?.Data || [], loading, error };
}