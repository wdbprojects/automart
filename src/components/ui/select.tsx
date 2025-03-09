import type React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { ChangeEvent, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  selectClassName?: string;
  noDefault?: boolean;
  disabled?: boolean;
}

const Select = (props: SelectProps) => {
  const {
    label,
    value,
    options,
    onChange,
    className,
    selectClassName,
    noDefault = true,
    disabled,
    ...rest
  } = props;

  return (
    <div className={cn("mt-1", className)}>
      {label && <h4 className="text-sm font-semibold">{label}</h4>}
      <div className="mt-1 relative">
        <select
          onChange={onChange}
          value={value ?? ""}
          disabled={disabled}
          className={cn(
            selectClassName,
            "disabled:!bg-gray-100 w-full  dark:disabled:!bg-gray-700 w-full px-3 py-2 border-input border rounded-md focus:outline-hidden appearance-none pr-12 bg-no-repeat bg-right z-10 custom-select text-sm",
            !disabled && "cursor-pointer",
          )}
          {...rest}
        >
          {noDefault && <option value="">Select</option>}
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
export default Select;
