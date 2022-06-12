import React, { ChangeEvent } from "react";
import { SelectInput } from "vcc-ui";
import { SelectInputProps } from "vcc-ui/dist/components/select-input/select-input";

export interface FilterBarProps
  extends Pick<
    SelectInputProps,
    "label" | "key" | "loading" | "isValid" | "description" | "errorMessage"
  > {
  options: Array<string>;
  selected: string;
  onSelect: (selected: string) => void;
}

export default function FilterBar({
  label,
  options,
  selected,
  onSelect,
  ...rest
}: FilterBarProps) {
  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    const selected = event.target.value;
    onSelect(selected);
  }

  return (
    <SelectInput label={label} value={selected} onChange={onChange} {...rest}>
      {options.map((option) => (
        <option
          value={option}
          key={option}
          aria-label={option}
          aria-selected={option === selected}
        >
          {option}
        </option>
      ))}
    </SelectInput>
  );
}
