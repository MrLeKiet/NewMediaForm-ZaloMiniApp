import { useQuery } from "react-query";
import { getJobList, getLaboreList, getSettings, getWards } from "./api";


import { useState } from "react";

export function useLaborJobsList() {
    const [filters, setFilters] = useState({
        job: "",
        ward: "",
        age: "",
        gender: "",
    });

    const queryParams = {};
    Object.keys(filters).forEach(key => {
        if (filters[key] !== "") {
            queryParams[key] = filters[key];
        }
    });

    const { data, isLoading: loading, error } = useQuery(
        ["labore-list", queryParams],
        () => getLaboreList(queryParams),
        {
            keepPreviousData: true,
            staleTime: 2 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );

    return {
        filters,
        setFilters,
        labores: data || [],
        loading,
        error
    };
}

export function useJobList(filters: any) {
    const { data, isLoading: loading, error } = useQuery(
        ["job-list", filters],
        () => getJobList(filters),
        {
            staleTime: 2 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );
    return { jobs: data || [], loading, error };
}

export function useSettings() {
    const { data, isLoading: loading, error } = useQuery(
        ["settings"],
        getSettings,
        {
            staleTime: 2 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );
    return { settings: data || {}, loading, error };
}

export function useWards() {
    const { data, isLoading: loading, error } = useQuery(
        ["wards"],
        getWards,
        {
            staleTime: 2 * 60 * 1000,
            cacheTime: 30 * 60 * 1000,
        }
    );
    return { wards: data || [], loading, error };
}

