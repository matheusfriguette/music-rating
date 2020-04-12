import React from 'react';
import { useField } from 'formik';

type Props = {
  label: string;
  type: 'text' | 'number' | 'date';
  name: string;
};

const Input: React.FC<Props> = ({ label, type, name }) => {
  const [field] = useField({ type: type, name: name });

  return (
    <label htmlFor={name}>
      <span className="block font-semibold text-sm">{label}</span>
      <input
        className="mt-1 w-full border rounded px-2 py-1 focus:outline-none focus:bg-gray-200"
        type={type}
        name={name}
        {...field}
      />
    </label>
  );
};

export default Input;
