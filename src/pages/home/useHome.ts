
import { useQuery } from "react-query";
import { getHotNewsList, getLaborerList, getUrgentJobRecruitment } from "./api";


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


export function useLaborer() {
    const { data, isLoading: loading, error } = useQuery(
        ["laborer-list"],
        getLaborerList,
        {
            staleTime: 2 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );
    return { laborers: data?.Data?.Data || [], loading, error };
}