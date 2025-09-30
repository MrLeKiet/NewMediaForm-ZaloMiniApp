import React from "react";

const Skeleton: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = "", style }) => (
    <div
        className={`animate-pulse bg-gray-200 rounded ${className}`}
        style={style}
    />
);

export default Skeleton;