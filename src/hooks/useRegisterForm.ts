import { useState } from "react";

export function useRegisterForm() {
    const [formData, setFormData] = useState({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

    const handleInputChange =
        (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value;
            if (field === "phone") {
                // Only allow numbers
                value = value.replace(/\D/g, "");
            }
            setFormData((prev) => ({ ...prev, [field]: value }));
        };

    const handleInputBlur = (field: string) => () => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const handleSelectChange = (field: string) => (value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleDateChange = (field: string) => (date: Date | undefined) => {
        setFormData((prev) => ({ ...prev, [field]: date }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return {
        formData,
        setFormData,
        touched,
        setTouched,
        handleInputChange,
        handleInputBlur,
        handleSelectChange,
        handleDateChange,
        handleSubmit,
    };
}
