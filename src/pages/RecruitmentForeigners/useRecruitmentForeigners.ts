import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { getRecruitmentForeignersJobs, getEnterpriseOptions } from "./api";


export interface FilterOption {
    value: string;
    label: string;
}

export function useFilterOptions() {
    return useQuery<FilterOption[], Error>(
        "enterprise-options",
        async () => {
            const data = await getEnterpriseOptions();
            return data.map((item: any) => ({
                value: item.value,
                label: item.label,
            }));
        },
        {
            staleTime: 2 * 60 * 1000, // 2 minutes
            cacheTime: 30 * 60 * 1000, // 1 hour
        }
    );
}

export function useRecruitmentJobs() {
    const [search, setSearch] = useState("");
    const [selectedFilter, setSelectedFilter] = useState<string>("");

    const { data: FilterOptionsData } = useFilterOptions();
    const FilterOptions = useMemo(() => [
        { label: "Tất cả", value: "" },
        ...(FilterOptionsData || [])
    ], [FilterOptionsData]);

    const { data, isLoading: loading, error } = useQuery(
        ["recruitment-foreigners-jobs", search, selectedFilter],
        () => getRecruitmentForeignersJobs({ search, enterprise: selectedFilter }),
        {
            keepPreviousData: true,
            staleTime: 2 * 60 * 1000, // 2 minutes
            cacheTime: 30 * 60 * 1000, // 30 minutes
        }
    );

    return {
        search,
        setSearch,
        selectedFilter,
        setSelectedFilter,
        jobs: data || [],
        loading,
        error,
        FilterOptions
    };
}
