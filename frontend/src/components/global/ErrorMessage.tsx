type ErrorProps = {
    message?: string;
};

const ErrorMessage = ({ message }: ErrorProps) => {
    if (!message) return null; // Không render gì nếu không có message

    return (
        <div className="bg-rose-100 bg-opacity-30 rounded-md px-3 py-1 mt-1 mb-2">
            <p className="text-rose-600 text-sm font-medium">{message}</p>
        </div>
    );
};

export default ErrorMessage;
