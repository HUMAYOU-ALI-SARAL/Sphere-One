import React from "react";
import Select from 'react-select'
import type { ActionMeta, MultiValue } from 'react-select'
import classNames from 'classnames';

type SelectProps = {
  value?: any,
  options?: { value: string; label: string, type?: string }[];
  onChange: (newValue: MultiValue<any>, actionMeta: ActionMeta<any>) => void;
  className?: string;
  placeholder?: string,
};

const MultiSelect = ({ value, options, onChange, ...props }: SelectProps) => {
  const { className, placeholder } = props;
  return (
    <Select
      value={value}
      placeholder={placeholder}
      options={options}
      isMulti
      isOptionSelected={(option) => option.selected}
      onChange={onChange}
      className={className}
      classNames={{
        control: ({ isFocused }) => classNames(
          isFocused && '!shadow-[0_0_0_1px] !shadow-orange',
          '!border-transparent !bg-transparent'
        ),
        valueContainer: () => '!bg-sp-gray-600 !text-white !border-none',
        indicatorsContainer: () => '!hidden',
        indicatorSeparator: () => '!hidden',
        input: () => 'multi-select-input !text-white',
        menu: () => '!bg-sp-gray-600 !border-none',
        menuList: () => 'text-white !border-none',
        option: ({ isFocused }) => classNames(
          '!bg-sp-gray-600 !border-none',
          isFocused && '!bg-sp-gray-700'
        ),
        multiValue: () => '!bg-sp-gray-700',
        multiValueLabel: () => '!text-white !text-14 !font-light',
        multiValueRemove: () => '!bg-transparent '
      }}
    />
  );
};

export default MultiSelect;
