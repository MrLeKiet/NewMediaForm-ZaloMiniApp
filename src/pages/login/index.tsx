import { Lock, User } from "lucide-react";
import React from "react";
import { Box, Button, Input, Page, Text, useNavigate } from "zmp-ui";
import InputBox from "../../components/InputBox";
import { useLogin } from "../../hooks/useLogin";

const { Password } = Input;

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { form, handleChange, login, loading, error } = useLogin();
    const [touched, setTouched] = React.useState({
        username: false,
        password: false,
    });

    const handleInputBlur = (field: string) => () => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ username: true, password: true });
        const success = await login();
        if (success) navigate("/profile");
    };

    return (
        <Page className="bg-gray-100 p-4 min-h-screen" style={{ paddingTop: 'var(--safe-top)', paddingBottom: 'var(--safe-bottom)' }}>
            <Box className="card-section">
                <Box className="flex justify-center mb-6 sm:mb-8">
                    <Box className="flex items-center space-x-2">
                        <Text size="large" className="text-blue-500">🔑</Text>
                        <Text.Header className="text-xl sm:text-2xl font-bold text-blue-800">
                            ĐĂNG NHẬP
                        </Text.Header>
                    </Box>
                </Box>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Box className="space-y-4 lg:col-span-2">
                        <InputBox
                            label="Tên đăng nhập"
                            icon={<User size={18} />}
                            error={touched.username && !form.username}
                            errorMessage={touched.username && !form.username ? "Vui lòng nhập giá trị" : undefined}
                        >
                            <Input
                                placeholder="Tên đăng nhập"
                                value={form.username}
                                onChange={handleChange("username")}
                                onBlur={handleInputBlur("username")}
                                label={undefined}
                                className="input-field"
                            />
                        </InputBox>
                        <InputBox
                            label="Mật khẩu"
                            icon={<Lock size={18} />}
                            error={touched.password && !form.password}
                            errorMessage={touched.password && !form.password ? "Vui lòng nhập giá trị" : undefined}
                        >
                            <Password
                                type="password"
                                placeholder="Nhập mật khẩu"
                                value={form.password}
                                onChange={handleChange("password")}
                                onBlur={handleInputBlur("password")}
                                label={undefined}
                                className="input-field"
                            />
                        </InputBox>
                        {error && <Text className="text-red-500 text-sm mb-2">{error}</Text>}
                    </Box>
                    <Box className="lg:col-span-2 mt-6 sm:mt-8 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4">
                        <Text className="text-sm text-gray-500">
                            (*) Vui lòng nhập đầy đủ thông tin
                        </Text>
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            <Button
                                variant="primary"
                                className="btn-primary"
                                htmlType="submit"
                                disabled={loading}
                            >
                                {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
                            </Button>
                        </div>
                    </Box>
                </form>
            </Box>
        </Page>
    );
};

export default LoginPage;
