import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "glass-card rounded-xl p-6 animate-fade-in",
        hover && "hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
};
