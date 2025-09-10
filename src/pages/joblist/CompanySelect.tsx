import React from "react";
import SingleSelect from "../../components/SingleSelect";

const companyOptions = [
    { value: "all", label: "Tất cả" },
    { value: "cpkd-dvbv-dna", label: "Công ty CPKD DVBV Đông Nam Á - Việt Nam" },
    { value: "cp-tm-xnk-gt", label: "Công ty CP TM và XNK Vật tư Giao thông" },
    { value: "dlt-hat", label: "Công ty TNHH Đại Lý Thuế H.A.T" },
    { value: "yen-viet", label: "Công ty TNHH Yến Việt" },
    { value: "maihi", label: "công ty TMHH Maihi Việt Nam" },
    // ...add more as needed
];

const CompanySelect: React.FC<{
    value: string;
    onChange: (val: string) => void;
}> = ({ value, onChange }) => {
    return (
        <div className="w-full">
            <label className="block text-lg font-medium text-gray-900 mb-1 ml-1">Doanh nghiệp</label>
            <div className="rounded-xl shadow bg-white px-2 py-1">
                <SingleSelect
                    options={companyOptions}
                    value={value}
                    onChange={onChange}
                    placeholder="Chọn doanh nghiệp"
                />
            </div>
        </div>
    );
};

export default CompanySelect;
