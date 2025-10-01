import api from "@/api/axiosInstance";

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getHotNewsList = async () => {
    try {
        await delay(5500);
        const response = await api.get("/HotNewsHomePage");
        return response.data;
    } catch (error) {
        console.error("Error fetching hot news:", error);
        throw error;
    }
};
