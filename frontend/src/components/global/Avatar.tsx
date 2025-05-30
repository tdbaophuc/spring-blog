interface IProps {
    name?: string;
    size?: string;
    className?: string;
    textSize?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Avatar = ({
    name,
    className = "",
    size = "w-10 h-10 md:w-12 md:h-12", // lớn hơn chút, chuẩn responsive
    textSize = "text-lg md:text-xl",
    onClick,
}: IProps) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className={`
                rounded-full 
                bg-gradient-to-tr from-blue-600 to-blue-400
                flex items-center justify-center
                font-semibold uppercase
                text-white
                select-none
                shadow-md
                transition-shadow duration-300
                hover:shadow-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${size} ${textSize} ${className}
            `}
        >
            {name?.charAt(0)}
        </button>
    );
};

export default Avatar;
