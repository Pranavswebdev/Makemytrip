import type { InputHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  error?: string;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
  { label, error, className = "", ...rest },
  ref,
) {
  return (
    <label className="block">
      <span className="mb-2 block text-[15px] font-medium text-heading">
        {label}
      </span>
      <input
        ref={ref}
        className={`w-full rounded-xl border-[1.5px] border-accent bg-surface px-4 py-4 text-[15px] text-text placeholder:text-placeholder outline-none focus:border-accent ${className}`}
        {...rest}
      />
      {error && <span className="mt-1 block text-[12px] text-accent">{error}</span>}
    </label>
  );
});
