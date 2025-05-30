interface IProps {
    name?: string;
    color?: string; // màu chữ hoặc bạn có thể dùng cho background
}

const CategoryBtn = ({ name, color = "#3b82f6" }: IProps) => {
    return (
        <div className="flex">
            <div
                className="px-4 py-1 rounded-full mt-2 mr-2 font-semibold text-xs border transition-colors duration-300 cursor-pointer select-none"
                style={{
                    backgroundColor: color,
                    color: "white",
                    borderColor: color,
                    boxShadow: `0 2px 6px ${color}66`, // bóng màu nhẹ
                }}
            >
                {name}
            </div>
        </div>
    );
};

export default CategoryBtn;
