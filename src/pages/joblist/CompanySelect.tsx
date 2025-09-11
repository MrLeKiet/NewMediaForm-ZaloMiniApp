import React from "react";
import SingleSelect from "../../components/SingleSelect";
import { companyOptions } from "../../constants/companyOptions";

const CompanySelect: React.FC<{
    value: string;
    onChange: (val: string) => void;
}> = ({ value, onChange }) => {
    return (
        <div className="w-full">
            {/* <label className="block text-lg font-medium text-gray-900 mb-1 ml-1">Doanh nghiệp</label> */}
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
