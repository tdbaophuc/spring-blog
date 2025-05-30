import Avatar from "./Avatar";

interface IComment {
    name?: string;
    content: string;
}

const Comments = ({ name, content }: IComment) => {
    return (
        <div className="flex items-start mb-6">
            <div className="mr-4">
                <Avatar name={name} size="w-10 h-10" />
            </div>
            <div className="bg-gray-100 rounded-lg p-3 shadow-sm max-w-[600px]">
                <p className="text-sm font-semibold text-gray-800">@{name}</p>
                <p className="mt-1 text-gray-600 text-sm leading-relaxed">{content}</p>
            </div>
        </div>
    );
};

export default Comments;
