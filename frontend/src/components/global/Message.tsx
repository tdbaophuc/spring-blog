interface IProps {
    message?: string; // cho phép message có thể undefined
    error?: boolean;
}

const Message = ({ message, error = false }: IProps) => {
    if (!message) return null; // nếu không có message thì không render gì

    const baseStyle =
        "border p-3 rounded-md text-center my-4 text-sm bg-opacity-5";

    const errorStyle =
        "bg-rose-500 border-rose-500 text-rose-600";

    const successStyle =
        "bg-green-500 border-green-500 text-green-600";

    return (
        <div className={`${baseStyle} ${error ? errorStyle : successStyle}`}>
            <p>{message}</p>
        </div>
    );
};

export default Message;
