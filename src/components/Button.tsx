import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "flex w-full items-center justify-center gap-2.5 rounded-xl px-4 py-4 text-[17px] font-semibold transition-opacity disabled:opacity-40";
  const styles =
    variant === "primary"
      ? "bg-accent text-bg"
      : "border-[1.5px] border-accent bg-transparent text-heading";
  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
}
