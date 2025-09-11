import axios from "axios";
import { useQuery } from "react-query";

export interface FilterOption {
  value: string;
  label: string;
}

export function useFilterOptions() {
  return useQuery(["FilterOptions"], async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/Enterprise`,
      {
        headers: { "Accept-Language": "2" },
      }
    );
    return (
      response.data?.Data?.Data || []
    ) as FilterOption[];
  });
}
