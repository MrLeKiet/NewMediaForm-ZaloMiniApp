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


    // Validation logic for required fields and formats
    const requiredFields: { [key: string]: string } = {
        fullName: "Vui lòng nhập họ và tên",
        birthDate: "Vui lòng chọn ngày sinh",
        gender: "Vui lòng chọn giới tính",
        idCard: "Vui lòng nhập số CCCD",
        issueDate: "Vui lòng chọn ngày cấp",
        issuePlace: "Vui lòng nhập nơi cấp",
        phone: "Vui lòng nhập số điện thoại",
        email: "Vui lòng nhập email",
        address: "Vui lòng nhập địa chỉ",
        major: "Vui lòng nhập chuyên ngành đào tạo",
        school: "Vui lòng nhập tên trường tốt nghiệp",
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
        if (!/^\S+@\S+\.\S+$/.test(value)) {
            return "Email không hợp lệ";
        }
        return "";
    }

    function validatePhone(value: any): string {
        if (!value) {
            return requiredFields["phone"];
        }
        if (!/^0\d{9,10}$/.test(value)) {
            return "Số điện thoại không hợp lệ";
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
        formData,
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
