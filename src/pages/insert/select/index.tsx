import React from 'react';
import { useField } from 'formik';

type Props = {
  options: Option[];
  label: string;
  name: string;
};

interface Option {
  text: string;
  value: string | number;
}

const Select: React.FC<Props> = ({ options, label, name }) => {
  const [field] = useField({ name: name });

  return (
    <label htmlFor={label}>
      <span className="block font-semibold text-sm">{label}</span>
      <select
        className="mt-1 w-full bg-white border rounded px-2 py-1 focus:outline-none focus:bg-gray-200 appearance-none"
        name={name}
        {...field}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
