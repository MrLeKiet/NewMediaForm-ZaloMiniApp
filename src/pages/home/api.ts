
import api from "@/api/axiosInstance";

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getHotNewsList() {
    try {
        await delay(2500);
        const response = await api.get("/HotNewsHomePage", {
            params: { rowIndex: 0, pageSize: 5 },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching hot news:", error);
        throw error;
    }
}

export async function getUrgentJobRecruitment() {
    try {
        await delay(2500);
        const response = await api.get("/UrgentJobRecruitment", {
            params: { rowIndex: 0, pageSize: 5 },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching urgent job recruitment:", error);
        throw error;
    }
}

export async function getLaborerList() {
    try {
        await delay(2500);
        const response = await api.get("/Labore", {
            params: { rowIndex: 0, pageSize: 5 },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching laborer list:", error);
        throw error;
    }
}


