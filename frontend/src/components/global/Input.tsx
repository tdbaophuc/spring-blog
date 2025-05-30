import { ChangeEventHandler } from "react";
import ErrorMessage from "./ErrorMessage";

interface IProps {
    label?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
    value?: string;
    message?: string;
    name?: string;
    type?: string;
}

const Input = ({
    label,
    onChange,
    placeholder,
    value,
    message,
    name,
    type = "text",
}: IProps) => {
    // Dùng template literal và condition gọn hơn
    const baseStyle =
        "py-2 px-4 w-full outline-none bg-transparent text-gray-600 rounded-md focus:shadow-md ";
    const errorStyle =
        "border border-rose-500 shadow-rose-500 focus:border-rose-500 ";
    const regularStyle =
        "border border-gray-200 shadow-blue-500 focus:border-blue-500 ";

    return (
        <div className="mb-3">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-black mb-1 font-semibold"
                >
                    {label}
                </label>
            )}
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`${baseStyle} ${
                    message ? errorStyle : regularStyle
                }`}
            />
            <ErrorMessage message={message} />
        </div>
    );
};

export default Input;
