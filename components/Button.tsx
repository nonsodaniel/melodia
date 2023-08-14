import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}
const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        children={children}
        disabled={disabled}
        type={type}
        className={twMerge(
          `w-full rounded-full bg-yellow-500 border border-transparent px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition`,
          className
        )}
      ></button>
    );
  }
);

Button.displayName = "Button";

export default Button;
