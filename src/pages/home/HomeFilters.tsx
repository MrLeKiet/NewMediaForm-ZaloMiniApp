import InputBox from "@/components/InputBox";
import SingleSelect from "@/components/SingleSelect";
import React from "react";

type HomeFiltersProps = {
    setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
};

const HomeFilters: React.FC<HomeFiltersProps> = ({ setShowNavbar }) => {
    return (
        <div className="px-4 flex flex-col gap-2">
            <input type="text" placeholder="Nhập vị trí muốn tìm việc" className="border rounded px-3 py-2 w-full" />
            <div className="gap-1">
                <InputBox label="" icon={<span className="text-gray-400"></span>}>
                    <SingleSelect
                        options={[
                            { label: "Công nghệ thông tin", value: "it" },
                            { label: "Kinh doanh", value: "business" },
                            { label: "Tiếp thị", value: "marketing" },
                            { label: "Thiết kế", value: "design" },
                        ]}
                        value={""}
                        placeholder="Chọn ngành nghề"
                        onChange={() => { }}
                        onOpen={() => setShowNavbar(false)}
                        onClose={() => setShowNavbar(true)}
                    />
                </InputBox>
                <InputBox label="" icon={<span className="text-gray-400"></span>}>
                    <SingleSelect
                        options={[
                            { label: "Dưới 5 triệu", value: "under_5m" },
                            { label: "5 - 10 triệu", value: "5m_10m" },
                            { label: "10 - 15 triệu", value: "10m_15m" },
                            { label: "Trên 15 triệu", value: "above_15m" },
                        ]}
                        value={""}
                        placeholder="Chọn mức lương"
                        onChange={() => { }}
                        onOpen={() => setShowNavbar(false)}
                        onClose={() => setShowNavbar(true)}
                    />
                </InputBox>
            </div>
        </div>
    );
};

export default HomeFilters;
