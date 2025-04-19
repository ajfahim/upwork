import React from "react";

interface IconProps {
  children: React.ReactNode;
  bgClass?: string;
  size?: string;
}

const Icon: React.FC<IconProps> = ({ children, bgClass = "bg-blue-100", size = "w-14 h-14" }) => (
  <span className={`inline-flex items-center justify-center ${size} rounded-full ${bgClass} shadow-inner`}>
    {children}
  </span>
);

export default Icon;
