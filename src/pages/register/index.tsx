import axios from "axios";
import {
    Briefcase,
    Building,
    Calendar,
    GraduationCap,
    IdCard,
    Lock,
    Mail,
    MapPin,
    Phone,
    User,
    Venus
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { getAccessToken, getPhoneNumber } from "zmp-sdk/apis";
import {
    Box,
    Button,
    DatePicker,
    Input,
    Page,
    Text,
    useNavigate
} from "zmp-ui";

import InputBox from "../../components/InputBox";
import MultiSelect from "../../components/MultiSelect";
import SingleSelect from "../../components/SingleSelect";
import { useRegisterForm } from "../../hooks/useRegisterForm";

const { Password } = Input;
const LoginInfoSection: React.FC<{
    formData: any;
    touched: any;
    handleInputChange: any;
    handleInputBlur: any;
}> = ({ formData, touched, handleInputChange, handleInputBlur }) => (
    <Box className="space-y-4">
        <Text className="text-lg font-semibold text-gray-700">
            Thông tin đăng nhập
        </Text>
        <InputBox
            label="Tên đăng nhập"
            icon={<User size={18} />}
            error={touched.username && !formData.username}
            errorMessage={touched.username && !formData.username ? "Vui lòng nhập giá trị" : undefined}
        >
            <Input
                placeholder="Tên đăng nhập"
                value={formData.username}
                onChange={handleInputChange("username")}
                onBlur={handleInputBlur("username")}
                label={undefined}
                className="input-field"
            />
        </InputBox>
        <InputBox
            label="Mật khẩu"
            icon={<Lock size={18} />}
            error={touched.password && !formData.password}
            errorMessage={touched.password && !formData.password ? "Vui lòng nhập giá trị" : undefined}
        >
            <Password
                type="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleInputChange("password")}
                onBlur={handleInputBlur("password")}
                label={undefined}
                className="input-field"
            />
        </InputBox>
        <InputBox
            label="Nhập lại mật khẩu"
            icon={<Lock size={18} />}
            error={touched.confirmPassword && !formData.confirmPassword}
            errorMessage={touched.confirmPassword && !formData.confirmPassword ? "Vui lòng nhập giá trị" : undefined}
        >
            <Password
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={formData.confirmPassword}
                onChange={handleInputChange("confirmPassword")}
                onBlur={handleInputBlur("confirmPassword")}
                label={undefined}
                className="input-field"
            />
        </InputBox>
    </Box>
);

const PersonalInfoRow1: React.FC<any> = ({
    formData,
    touched,
    handleInputChange,
    handleInputBlur,
    handleSelectChange,
    handleDateChange,
    settings,
}) => (
    <div className="grid grid-cols-1 md:grid-cols-3" style={{ marginTop: 0 }}>
        <InputBox
            label="Họ và Tên"
            icon={<User size={18} />}
            error={touched.fullName && !formData.fullName}
            errorMessage={touched.fullName && !formData.fullName ? "Vui lòng nhập giá trị" : undefined}
        >
            <Input
                placeholder="Nhập họ và tên"
                value={formData.fullName}
                onChange={handleInputChange("fullName")}
                onBlur={handleInputBlur("fullName")}
                label={undefined}
                className="input-field"
            />
        </InputBox>
        <InputBox label="Ngày sinh" icon={<Calendar size={18} />}>
            <DatePicker
                value={formData.birthDate}
                onChange={handleDateChange("birthDate")}
                placeholder="Chọn ngày"
                label={undefined}
            />
        </InputBox>
        <InputBox label="Giới tính" icon={<Venus size={18} />}>
            <SingleSelect
                options={settings?.ListGenderUser || []}
                value={formData.gender}
                onChange={option => handleSelectChange("gender")(typeof option === 'object' && option !== null && 'label' in option ? (option as any).label : option)}
                placeholder="Chọn giới tính"
            />
        </InputBox>
    </div>
);

const PersonalInfoRow2: React.FC<any> = ({
    formData,
    touched,
    handleInputChange,
    handleInputBlur,
    handleDateChange,
}) => (
    <div className="grid grid-cols-1 md:grid-cols-3" style={{ marginTop: 0 }}>
        <InputBox
            label="Căn Cước Công Dân"
            icon={<IdCard size={18} />}
            error={touched.idCard && !formData.idCard}
            errorMessage={touched.idCard && !formData.idCard ? "Vui lòng nhập giá trị" : undefined}
        >
            <Input
                placeholder="Nhập số CCCD"
                value={formData.idCard}
                onChange={handleInputChange("idCard")}
                onBlur={handleInputBlur("idCard")}
                label={undefined}
                className="input-field"
            />
        </InputBox>
        <InputBox label="Ngày cấp" icon={<Calendar size={18} />}>
            <DatePicker
                value={formData.issueDate}
                onChange={handleDateChange("issueDate")}
                placeholder="Chọn ngày"
                label={undefined}
            />
        </InputBox>
        <InputBox
            label="Nơi cấp"
            icon={<MapPin size={18} />}
            error={touched.issuePlace && !formData.issuePlace}
            errorMessage={touched.issuePlace && !formData.issuePlace ? "Vui lòng nhập giá trị" : undefined}
        >
            <Input
                placeholder="Nơi cấp"
                value={formData.issuePlace}
                onChange={handleInputChange("issuePlace")}
                onBlur={handleInputBlur("issuePlace")}
                label={undefined}
                className="input-field"
            />
        </InputBox>
    </div>
);

const PersonalInfoRow3: React.FC<any> = ({
    formData,
    touched,
    handleInputChange,
    handleInputBlur,
    handleSelectChange,
    settings,
}) => (
    <div className="grid grid-cols-1 md:grid-cols-3" style={{ marginTop: 0 }}>
        <InputBox
            label="Số điện thoại"
            icon={<Phone size={18} />}
            error={touched.phone && !formData.phone}
            errorMessage={touched.phone && !formData.phone ? "Vui lòng nhập giá trị" : undefined}
        >
            <Input
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleInputChange("phone")}
                onBlur={handleInputBlur("phone")}
                label={undefined}
                className="input-field"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={15}
            />
        </InputBox>
        <InputBox
            label="Email"
            icon={<Mail size={18} />}
            error={touched.email && !formData.email}
            errorMessage={touched.email && !formData.email ? "Vui lòng nhập giá trị" : undefined}
        >
            <Input
                placeholder="Nhập email"
                value={formData.email}
                onChange={handleInputChange("email")}
                onBlur={handleInputBlur("email")}
                label={undefined}
                className="input-field"
            />
        </InputBox>
        <InputBox label="Dân tộc" icon={<GraduationCap size={18} />}>
            <SingleSelect
                options={settings?.ListEthnicity || []}
                value={formData.ethnicity}
                onChange={option => handleSelectChange("ethnicity")(typeof option === 'object' && option !== null && 'label' in option ? (option as any).label : option)}
                placeholder="Chọn dân tộc"
            />
        </InputBox>
    </div>
);

const PersonalInfoRow4: React.FC<any> = ({
    formData,
    touched,
    handleInputChange,
    handleInputBlur,
    handleSelectChange,
    settings
}) => (
    <div className="grid grid-cols-1 md:grid-cols-3" style={{ marginTop: 0 }}>
        <InputBox
            label="Địa chỉ liên lạc"
            icon={<MapPin size={18} />}
            error={touched.address && !formData.address}
            errorMessage={touched.address && !formData.address ? "Vui lòng nhập giá trị" : undefined}
        >
            <Input
                placeholder="Nhập địa chỉ"
                value={formData.address}
                onChange={handleInputChange("address")}
                onBlur={handleInputBlur("address")}
                label={undefined}
                className="input-field"
            />
        </InputBox>
        <InputBox label="Trình độ học vấn" icon={<GraduationCap size={18} />}>
            <Input
                placeholder="Nhập trình độ học vấn"
                value={formData.educationLevel}
                onChange={handleInputChange("educationLevel")}
                onBlur={handleInputBlur("educationLevel")}
                label={undefined}
                className="input-field"
            />
        </InputBox>
        <InputBox label="Trình độ CMKT cao nhất" icon={<GraduationCap size={18} />}>
            <SingleSelect
                options={settings?.TechnicalLevel || []}
                value={formData.cmktLevel}
                onChange={option => handleSelectChange("cmktLevel")(typeof option === 'object' && option !== null && 'label' in option ? (option as any).label : option)}
                placeholder="Chọn trình độ CMKT"
            />
        </InputBox>
    </div>
);

const PersonalInfoRow5: React.FC<any> = ({
    formData,
    touched,
    handleInputChange,
    handleInputBlur,
    handleSelectChange,
    settings,
}) => (
    <div className="grid grid-cols-1 md:grid-cols-3" style={{ marginTop: 0 }}>
        <InputBox
            label="Chuyên ngành đào tạo"
            icon={<GraduationCap size={18} />}
            error={touched.major && !formData.major}
            errorMessage={touched.major && !formData.major ? "Vui lòng nhập giá trị" : undefined}
        >
            <Input
                placeholder="Nhập chuyên ngành đào tạo"
                value={formData.major}
                onChange={handleInputChange("major")}
                onBlur={handleInputBlur("major")}
                label={undefined}
                className="input-field"
            />
        </InputBox>
        <InputBox
            label="Tên trường tốt nghiệp"
            icon={<Building size={18} />}
            error={touched.school && !formData.school}
            errorMessage={touched.school && !formData.school ? "Vui lòng nhập giá trị" : undefined}
        >
            <Input
                placeholder="Nhập tên trường"
                value={formData.school}
                onChange={handleInputChange("school")}
                onBlur={handleInputBlur("school")}
                label={undefined}
                className="input-field"
            />
        </InputBox>
        <InputBox label="Ngành nghề mong muốn" icon={<Briefcase size={18} />}>
            <MultiSelect
                options={settings?.ListJob || []}
                value={formData.desiredJob}
                onChange={(selected) => handleSelectChange("desiredJob")(selected)}
                max={2}
                placeholder="Chọn ngành nghề (tối đa 2)"
            />
        </InputBox>
    </div>
);

const PersonalInfoSection: React.FC<any> = (props) => (
    <Box className="space-y-4">
        <Text className="text-lg font-semibold text-gray-700 mb-2">
            Thông tin cá nhân
        </Text>
        <PersonalInfoRow1 {...props} settings={props.settings} />
        <PersonalInfoRow2 {...props} />
        <PersonalInfoRow3 {...props} settings={props.settings} />
        <PersonalInfoRow4 {...props} settings={props.settings} />
        <PersonalInfoRow5 {...props} settings={props.settings} />
    </Box>
);




const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const APP_ID = "1243322217178920789";
    const [phoneToken, setPhoneToken] = useState("");

    // Fetch phone token on mount
    useEffect(() => {
        async function fetchPhoneToken() {
            try {
                const phoneToken = await getPhoneNumber();
                setPhoneToken(phoneToken.token ?? "");
                console.log("Token:", phoneToken.token);
            } catch (err) {
                console.error("Error fetching phone token:", err);
            }
        }
        fetchPhoneToken();
    }, []);
    const {
        formData,
        touched,
        handleInputChange,
        handleInputBlur,
        handleSelectChange,
        handleDateChange,
        setFormData,
    } = useRegisterForm();

    useEffect(() => {
        async function fetchAccessToken() {
            try {
                const accessToken = await getAccessToken();
                setAccessToken(accessToken ?? null);
            } catch (err) {
                console.error("Error fetching access token:", err);
            }
        }
        fetchAccessToken();
    }, []);

    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    // Pre-fill form with user info from navigation state
    useEffect(() => {
        // Pre-fill all text input fields with example/default values
        setFormData((prev: any) => ({
            ...prev,
            username: prev.username || "exampleuser",
            password: prev.password || "password123",
            confirmPassword: prev.confirmPassword || "password123",
            fullName: prev.fullName || "Nguyen Van A",
            idCard: prev.idCard || "123456789012",
            issuePlace: prev.issuePlace || "Hanoi",
            phone: prev.phone || "0987654321",
            email: prev.email || "example@email.com",
            address: prev.address || "123 Main St, Hanoi",
            educationLevel: prev.educationLevel || "Đại học",
            major: prev.major || "Công nghệ thông tin",
            school: prev.school || "ĐH Bách Khoa",
            summary: prev.summary || "Tôi là ứng viên tiềm năng.",
            JobPosition: prev.JobPosition || "Nhân viên",
            Job: prev.Job || "IT",
            Position: prev.Position || "Lập trình viên",
            Qualifications: prev.Qualifications || "Tốt nghiệp đại học",
            WorkingTime: prev.WorkingTime || "Full-time",
            WorkExperience: prev.WorkExperience || "2 năm",
            Salary: prev.Salary || "15 triệu",
            RecruitmentPeriod: prev.RecruitmentPeriod || "2025",
            JobRequirements: prev.JobRequirements || "Có kinh nghiệm.",
            Status: prev.Status || "Đang tìm việc",
            Address: prev.Address || "123 Main St, Hanoi"
        }));
    }, [setFormData]);

    // Fetch settings for select options
    useEffect(() => {
        async function fetchSettings() {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/Settings`, {
                    headers: {
                        "Accept": "application/json",
                        "Accept-Language": "2"
                    }
                });
                setSettings(res.data.Data);
            } catch (err) {
                console.error("Error fetching settings:", err);
                setMessage("Không thể tải dữ liệu settings");
            }
        }
        fetchSettings();
    }, []);

    // Map formData to API body for LaboreSignUp
    function buildLaboreSignUpBody(formData: any) {
        return {
            Accesstoken: accessToken || "",
            Code: phoneToken || "",
            ZaloId: APP_ID,
            FullName: formData.fullName || "",
            DateOfBirth: formData.birthDate ? new Date(formData.birthDate).toISOString().slice(0, 10) : "",
            Gender: formData.gender || "",
            CID: formData.idCard || "",
            CIDDate: formData.issueDate ? new Date(formData.issueDate).toISOString().slice(0, 10) : "",
            CIDAddress: formData.issuePlace || "",
            Phone: formData.phone || "",
            Email: formData.email || "",
            Ethnicity: formData.ethnicity || "",
            Address: formData.address || "",
            Study: formData.educationLevel || "",
            TechnicalLevel: formData.cmktLevel || "",
            TrainingMajor: formData.major || "",
            GraduateSchool: formData.school || "",
                DesiredCareer: Array.isArray(formData.desiredJob)
                    ? formData.desiredJob.map((career: any) => ({
                        CareerId: (typeof career === 'object' && career !== null && ('value' in career || 'id' in career))
                            ? (career.value || career.id || "")
                            : "",
                        CareerName: (typeof career === 'object' && career !== null && ('label' in career || 'name' in career))
                            ? (career.label || career.name || "")
                            : career
                    }))
                    : []

        };
    }

    // Handle form submit
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            const body = buildLaboreSignUpBody(formData);
            console.log("Sending access token:", accessToken);
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/LaboreSignUp`, body, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Accept-Language": "2"
                }
            });
            if (res.data.StatusResult?.Code === 0) {
                setMessage("Đăng ký thành công!");
                // Optionally reset form
                // setFormData({});
            } else {
                setMessage(res.data.StatusResult?.Message || "Đăng ký thất bại");
            }
        } catch (err: any) {
            if (err.response) {
                console.error("Registration error response:", err.response);
                setMessage(`Lỗi khi gửi đăng ký: ${err.response.data?.StatusResult?.Message || err.response.statusText}`);
            } else if (err.request) {
                console.error("Registration error request:", err.request);
                setMessage("Lỗi khi gửi đăng ký: Không nhận được phản hồi từ máy chủ");
            } else {
                console.error("Registration error:", err.message);
                setMessage(`Lỗi khi gửi đăng ký: ${err.message}`);
            }
            setMessage("Lỗi khi gửi đăng ký");
        }
        setLoading(false);
    }

    return (
        <Page className="bg-gray-100 p-4 min-h-screen" style={{ paddingTop: 'var(--safe-top)', paddingBottom: 'var(--safe-bottom)' }}>
            <Box className="card-section">
                {/* Title */}
                <Box className="flex justify-center mb-6 sm:mb-8">
                    <Box className="flex items-center space-x-2">
                        <Text size="large" className="text-blue-500">🔍</Text>
                        <Text.Header className="text-xl sm:text-2xl font-bold text-blue-800">ĐĂNG KÝ THÀNH VIÊN</Text.Header>
                    </Box>
                </Box>

                {/* Show message */}
                {message && (
                    <Box className="mb-4">
                        <Text className="text-red-500">{message}</Text>
                    </Box>
                )}

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                    <LoginInfoSection
                        formData={formData}
                        touched={touched}
                        handleInputChange={handleInputChange}
                        handleInputBlur={handleInputBlur}
                    />
                    <PersonalInfoSection
                        formData={formData}
                        touched={touched}
                        handleInputChange={handleInputChange}
                        handleInputBlur={handleInputBlur}
                        handleSelectChange={handleSelectChange}
                        handleDateChange={handleDateChange}
                        settings={settings}
                    />
                    {/* Bottom: Note + Buttons */}
                    <Box className="lg:col-span-4 mt-6 sm:mt-8 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-4">
                        <Text className="text-sm text-gray-500">(*) Vui lòng nhập đầy đủ thông tin</Text>
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            <Button
                                variant="primary"
                                className="btn-primary"
                                htmlType="submit"
                                disabled={loading}
                            >
                                {loading ? "Đang gửi..." : "Đăng Ký Ngay"}
                            </Button>
                            <Button className="btn-sky">Đăng Ký Cho Nhà Tuyển Dụng</Button>
                            <Button className="btn-blue" onClick={() => navigate("/home")}>Về trang home</Button>
                        </div>
                    </Box>
                </form>
            </Box>
        </Page>
    );
};

export default RegisterPage;
