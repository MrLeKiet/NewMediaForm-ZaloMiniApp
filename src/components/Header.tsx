import React from "react";

const Header: React.FC = () => {
    const headerRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        if (headerRef.current) {
            const height = headerRef.current.offsetHeight;
            document.documentElement.style.setProperty('--header-height', height + 'px');
        }
        });
    return (

    <div ref={headerRef} className="bg-yellow-400 px-4 flex items-center" style={{ paddingTop: 'var(--safe-top)', paddingBottom: '10px' }}>
        <img
            src="https://thongtinvieclamkhanhhoa.vn/assets/images/brand/trung-tam-dich-viec-lam-logo-header.svg"
            alt="Logo Trung tâm dịch vụ việc làm Khánh Hòa"
            style={{ height: 40 }}
        />
    </div>
    )
};

export default Header;
