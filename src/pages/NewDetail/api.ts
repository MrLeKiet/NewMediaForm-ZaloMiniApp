import api from "@/api/axiosInstance";

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getNewsDetail(id: string) {
    try {
        await delay(5500);
        const response = await api.get("/GetNews", {
            params: { newsId: id },
        });
        return response.data?.Data?.Data || null;
    } catch (error) {
        console.error("Error fetching news detail:", error);
        throw error;
    }
}