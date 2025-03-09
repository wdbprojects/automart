import { ChangeEvent } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SelectProps {
  label?: string;
  name: string;
  value: string;
  onChange?: (event: { target: HTMLSelectElement }) => void;
  options: { value: string; label: string }[];
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  noDefault?: boolean;
}

const CustomSelect = (props: SelectProps) => {
  const {
    label,
    name,
    value,
    options,
    onChange,
    className,
    placeholder,
    disabled,
    noDefault = true,
    ...rest
  } = props;

  return (
    <div onChange={onChange}>
      {label && <h4 className="text-sm font-semibold mb-1">{label}</h4>}
      <Select
        name={name}
        value={value ?? ""}
        onValueChange={(value) =>
          onChange?.({ target: { value } as HTMLSelectElement })
        }
        disabled={disabled ?? false}
      >
        <SelectTrigger className="cursor-pointer">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={cn("w-full")}>
          <SelectGroup>
            {noDefault &&
              options.map((option) => {
                return (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="cursor-pointer"
                  >
                    {option.label}
                  </SelectItem>
                );
              })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
export default CustomSelect;

// {
//   value = "",
//   onChange = () => {},
//   options = [],
//   placeholder = "Select an option",
// }: SelectProps
