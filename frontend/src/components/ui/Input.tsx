import { InputProps } from "../../types";

const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    placeholder,
    value,
    onChange,
    required = false,
  }) => {
    return (
      <div className="mb-4">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <input
          type={type}
          id={id}
          className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
        />
      </div>
    );
};
  
export default Input;