import { IconType } from "react-icons";

interface IProps {
    title?: string;
    className?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    loading?: boolean;
    component?: React.ElementType;
    bg?: string;
    rest?: any;
    disabled?: boolean;
    icon?: IconType;
}

const Button = ({
    title,
    className = "",
    onClick,
    loading = false,
    component: Component,
    disabled = false,
    icon: Icon,
    bg = "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300",
    ...rest
}: IProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            {...rest}
            disabled={disabled || loading}
            className={
                `flex items-center justify-center w-full py-2 px-5 rounded-lg
                 font-semibold text-white
                 shadow-md
                 transition
                 duration-300
                 ease-in-out
                 disabled:cursor-not-allowed disabled:opacity-60
                 ${bg}
                 hover:shadow-lg
                 ${className}`
            }
        >
            {Icon && !loading && <Icon className="mr-2 text-lg" />}
            {loading ? (
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    {title && <span className="select-none">Loading...</span>}
                </div>
            ) : title ? (
                title
            ) : (
                Component && <Component />
            )}
        </button>
    );
};

export default Button;
