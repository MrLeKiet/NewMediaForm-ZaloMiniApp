import { useQuery } from "react-query";
import { getLaborerList } from "../LaborerJobsList/api";

export function useLaborerList(filters: any) {
  // Only send non-empty params
  const params: Record<string, string> = {};
  Object.keys(filters).forEach(key => {
    if (filters[key] !== "") {
      params[key] = filters[key];
    }
  });

  const { data, isLoading, error } = useQuery([
    "laborer-list",
    params,
  ], () => getLaborerList(params), {
    keepPreviousData: true,
    staleTime: 2 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  return {
    laborers: data || [],
    loading: isLoading,
    error,
  };
}
