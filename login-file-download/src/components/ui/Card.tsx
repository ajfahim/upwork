import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`relative max-w-md w-full rounded-3xl shadow-2xl p-8 text-center ${className}`}>
    {children}
  </div>
);

export default Card;
