import { ChangeEventHandler } from "react";
import ErrorMessage from "./ErrorMessage";

interface IProps {
  label?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  value?: string;
  message?: string;
  name?: string;
}

const Textarea = ({
  label,
  onChange,
  placeholder,
  value,
  message,
  name,
}: IProps) => {
  const errorStyle =
    "border border-red-500 bg-red-50 text-red-700 placeholder-red-400 focus:border-red-600 focus:ring-1 focus:ring-red-600 rounded-md py-3 px-4 w-full outline-none shadow-sm transition duration-300 ease-in-out";
  const regularStyle =
    "border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-md py-3 px-4 w-full outline-none shadow-sm transition duration-300 ease-in-out";

  return (
    <div className="mb-5">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 select-none"
        >
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        className={message ? errorStyle : regularStyle}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={5}
      />
      <ErrorMessage message={message} />
    </div>
  );
};

export default Textarea;
