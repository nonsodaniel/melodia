import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, disabled, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(` flex 
    w-full 
    px-3 
    py-3 
    rounded-md 
    bg-neutral-700
    border
    border-transparent
    text-sm 
    file:border-0 
    file:bg-transparent 
    file:text-sm 
    file:font-medium 
   
    placeholder:text-neutral-400 
    disabled:cursor-not-allowed 
    disabled:opacity-50
    focus:outline-none`)}
        ref={ref}
        {...props}
        disabled={disabled}
      />
    );
  }
);

Input.displayName;

export default Input;
