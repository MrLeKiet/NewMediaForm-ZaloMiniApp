

import api from "@/api/axiosInstance";

export async function getEnterpriseOptions() {
    try {
        const response = await api.get("/Enterprise");
        return response.data?.Data?.Data || [];
    } catch (error) {
        console.error("Error fetching enterprise options:", error);
        throw error;
    }
}

export async function getRecruitmentForeignersJobs(params: { search?: string; enterprise?: string }) {
    try {
        const response = await api.get("/RecruitmentForeigners", { params });
        return response.data?.Data?.Data || [];
    } catch (error) {
        console.error("Error fetching recruitment foreigners jobs:", error);
        throw error;
    }
}
