import React from "react";


const HomeHeader: React.FC = () => (
    <div className="bg-yellow-400 text-white px-4 flex items-center" style={{ paddingTop: 'var(--safe-top)', paddingBottom: '10px' }}>
        <img
            src="https://thongtinvieclamkhanhhoa.vn/assets/images/brand/trung-tam-dich-viec-lam-logo-header.svg"
            alt="Logo Trung tâm dịch vụ việc làm Khánh Hòa"
            style={{ height: 40 }}
        />
    </div>
);

export default HomeHeader;
