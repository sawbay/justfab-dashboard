import React from "react";
import { IMAGES } from "@/constants/images";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const baseStyles = "rounded-lg font-dynapuff transition-all hover:scale-110";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const buttonStyle = {
    backgroundImage: `url(${IMAGES.bgButton})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    color: "#fff",
  };

  return (
    <button
      style={buttonStyle}
      className={`${baseStyles} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
