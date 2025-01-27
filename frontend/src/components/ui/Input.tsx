import { InputProps } from "../../types";

const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    placeholder,
    value,
    onChange,
    hasError,
    errorMessage,
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
          className={`w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
            hasError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
        />
        {hasError && <p className="text-sm text-red-500 mt-1">{errorMessage}</p>}
      </div>
    );
};
  
export default Input;