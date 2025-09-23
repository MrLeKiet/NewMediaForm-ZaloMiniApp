import { useState } from "react";

interface LoginState {
    username: string;
    password: string;
}

export function useLogin() {
    const [form, setForm] = useState<LoginState>({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (field: keyof LoginState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const login = async () => {
        setLoading(true);
        setError(null);
        try {
            // TODO: Replace with real API call
            if (!form.username || !form.password) throw new Error("Vui lòng nhập đầy đủ thông tin");
            // Simulate success
            return true;
        } catch (err: any) {
            setError(err.message || "Đăng nhập thất bại");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { form, handleChange, login, loading, error };
}
