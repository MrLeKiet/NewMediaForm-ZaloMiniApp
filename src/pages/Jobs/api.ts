import api from "@/api/axiosInstance";

export async function getJobList(filters = {}) {
  try {
    const params = {};
    Object.keys(filters).forEach(key => {
      if (filters[key] !== "") {
        params[key] = filters[key];
      }
    });
    const res = await api.get("/JobList", { params });
    return res.data?.Data?.Data || [];
  } catch (error) {
    console.error("Error fetching job list:", error);
    return [];
  }
}
