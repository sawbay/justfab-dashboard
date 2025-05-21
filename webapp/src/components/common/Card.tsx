import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={` backdrop-blur-sm rounded-2xl p-4 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
