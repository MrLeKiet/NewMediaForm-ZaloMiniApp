import React from "react";

const JobEmployerInfo: React.FC<{ job: any }> = ({ job }) => (
    <div className="border-2 border-orange-500 rounded-lg mb-4">
        <div className="bg-white text-orange-500 font-bold text-center py-2 border-b border-orange-500">NHÀ TUYỂN DỤNG</div>
        <div className="p-3 text-sm text-gray-800 space-y-2">
            <div><b>Tên công ty:</b> {job.companyname}</div>
            <div><b>Địa chỉ:</b> {job.companyaddress}</div>
            <div><b>Quy mô:</b> {job.companyscale}</div>
            <button className="w-full bg-red-500 text-white font-bold py-2 rounded mt-2">Đăng Nhập Để Lấy Thông Tin Liên Hệ Và Nộp CV</button>
        </div>
    </div>
);

export default JobEmployerInfo;
