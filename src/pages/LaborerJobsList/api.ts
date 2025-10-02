import api from "@/api/axiosInstance";

export async function getSettings() {
    try {
        const res = await api.get("/Settings");
    return res.data?.Data || {};
    } catch (error) {
        console.error("Error fetching settings:", error);
        return {};
    }
}

export async function getWards() {
    try {
        const res = await api.get("/Wards");
        return res.data?.Data?.Data || [];
    } catch (error) {
        console.error("Error fetching wards:", error);
        return [];
    }
}

export async function getLaborerList(filters = {}) {
    try {
        // Always include rowIndex and pageSize
        const defaultParams = { rowIndex: 0, pageSize: 5 };
        // Build query params, omit keys with empty value but always include rowIndex and pageSize
        const params = { ...defaultParams, ...filters };
        const res = await api.get("/Labore", { params });
        return res.data?.Data?.Data || [];
    } catch (error) {
        console.error("Error fetching laborer list:", error);
        return [];
    }
}

export async function getJobList(filters = {}) {
    try {
        // Build query params, omit keys with empty value
        const params = Object.entries(filters)
            .filter(([_, v]) => v !== "")
            .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
        const res = await api.get("/JobList", { params });
        return res.data?.Data?.Data || [];
    } catch (error) {
        console.error("Error fetching job list:", error);
        return [];
    }
}
