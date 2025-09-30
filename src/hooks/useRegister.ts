import { useState } from "react";

export function useRegisterForm() {
    const [formData, setFormData] = useState<any>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange =
        (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value;
            if (field === "phone") {
                // Only allow numbers
                value = value.replace(/\D/g, "");
            }
            setFormData((prev: any) => ({ ...prev, [field]: value }));
            validateField(field, value);
        };

    const handleInputBlur = (field: string) => () => {
        setTouched((prev) => ({ ...prev, [field]: true }));
        validateField(field, formData[field]);
    };

    const handleSelectChange = (field: string) => (value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
        validateField(field, value);
    };

    const handleDateChange = (field: string) => (date: Date | undefined) => {
        setFormData((prev: any) => ({ ...prev, [field]: date }));
        validateField(field, date);
    };

    const requiredFields: { [key: string]: string } = {
        fullName: "Vui lòng nhập Họ và Tên",
        birthDate: "Vui lòng chọn ngày sinh",
        gender: "Vui lòng chọn giới tính",
        idCard: "Vui lòng nhập số CCCD",
        issueDate: "Vui lòng chọn ngày cấp CCCD",
        issuePlace: "Vui lòng nhập nơi cấp CCCD",
        phone: "Vui lòng nhập số điện thoại",
        email: "Vui lòng nhập email",
        ethnicity: "Vui lòng chọn dân tộc",
        address: "Vui lòng nhập địa chỉ liên lạc",
        educationLevel: "Vui lòng nhập trình độ học vấn",
        cmktLevel: "Vui lòng chọn Trình độ CMKT cao nhất",
        major: "Vui lòng nhập chuyên ngành đào tạo",
        school: "Vui lòng nhập Tên trường tốt nghiệp",
        desiredJob: "Vui lòng chọn ngành nghề mong muốn",
    };

    function validateField(field: string, value: any) {
        let error = "";
        if (requiredFields[field]) {
            error = getFieldError(field, value);
        }
        setErrors((prev) => ({ ...prev, [field]: error }));
        return error;
    }

    function getFieldError(field: string, value: any): string {
        if (field === "desiredJob") {
            return validateDesiredJob(value);
        }
        if (field === "email") {
            return validateEmail(value);
        }
        if (field === "phone") {
            return validatePhone(value);
        }
        if (!value) {
            return requiredFields[field];
        }
        return "";
    }

    function validateDesiredJob(value: any): string {
        if (!value || (Array.isArray(value) && value.length === 0)) {
            return requiredFields["desiredJob"];
        }
        return "";
    }

    function validateEmail(value: any): string {
        if (!value) {
            return requiredFields["email"];
        }
        // Check for spaces
        if (/\s/.test(value)) {
            return "Email không được chứa khoảng trắng.";
        }
        // Check for @ symbol
        if (!value.includes("@")) {
            return "Email phải chứa ký tự @.";
        }
        // Check for domain part
        const parts = value.split("@");
        if (parts.length !== 2 || !parts[1]) {
            return "Email phải có phần tên miền sau ký tự @.";
        }
        // Check for dot and at least 2+ chars after last dot
        const domain = parts[1];
        const lastDot = domain.lastIndexOf(".");
        if (lastDot === -1 || domain.length - lastDot <= 2) {
            return "Tên miền email phải có dấu chấm và phần mở rộng hợp lệ, ví dụ: .com, .edu, .vn, .org, .jp";
        }
        // Basic format check
        if (!/^\S+@\S+\.\S+$/.test(value)) {
            return "Địa chỉ email không hợp lệ, ví dụ: mailer@yourcompany.com";
        }
        return "";
    }

    function validatePhone(value: any): string {
        if (!value) {
            return requiredFields["phone"];
        }
        // Check for non-digit characters
        if (/\D/.test(value)) {
            return "Số điện thoại sai";
        }
        // Must be exactly 10 digits, start with 0
        if (!/^0\d{9}$/.test(value)) {
            return "Số điện thoại sai";
        }
        return "";
    }

    function validateForm() {
        const newErrors: { [key: string]: string } = {};
        Object.keys(requiredFields).forEach((field) => {
            newErrors[field] = validateField(field, formData[field]);
        });
        setErrors(newErrors);
        // Return true if no errors
        return Object.values(newErrors).every((err) => !err);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            // Optionally, set all touched to true to show errors
            setTouched((prev) => {
                const allTouched: { [key: string]: boolean } = { ...prev };
                Object.keys(requiredFields).forEach((field) => {
                    allTouched[field] = true;
                });
                return allTouched;
            });
            return;
        }
        console.log("Form submitted:", formData);
    };

    return {
        formData: { ...formData, errors },
        setFormData,
        touched,
        setTouched,
        errors,
        handleInputChange,
        handleInputBlur,
        handleSelectChange,
        handleDateChange,
        handleSubmit,
        validateForm,
        validateField,
    };
}
