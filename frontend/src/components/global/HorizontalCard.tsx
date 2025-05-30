import { Link } from "react-router-dom";
import { AVATAR_URL } from "../../constants/common";
import { BLOG_IMAGE_ENDPOINT } from "../../constants/routes";
import { PRIMARY } from "../../constants/theme";
import { Post } from "../../types/types";
import CategoryBtn from "./CategoryBtn";
import UserInfo from "./UserInfo";

interface IProps {
    data: Post;
}
const HorizontalCard = ({ data }: IProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <div
                    className="md:w-[35%] lg:w-[40%] h-64 md:h-auto bg-center bg-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                    style={{
                        backgroundImage: `url(${BLOG_IMAGE_ENDPOINT}${data.imageName})`,
                    }}
                    role="img"
                    aria-label={data.title}
                ></div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 p-6 bg-gray-50">
                    <CategoryBtn
                        name={data.category?.categoryTitle || "Unknown"}
                        color={PRIMARY}
                    />

                    <Link to={`story/${data.id}`} className="mt-2">
                        <h2 className="text-gray-800 font-extrabold text-2xl sm:text-3xl line-clamp-2 hover:text-orange-500 transition-colors cursor-pointer">
                            {data.title}
                        </h2>
                    </Link>

                    <div className="flex items-center mt-4 mb-3">
                        <UserInfo name={data.users.name} avatar={AVATAR_URL} />
                    </div>

                    <div
                        dangerouslySetInnerHTML={{ __html: data.content }}
                        className="text-gray-600 text-base line-clamp-3 mb-4"
                    ></div>

                    <Link
                        to={`story/${data.id}`}
                        className="self-start text-orange-500 font-semibold hover:underline transition"
                    >
                        Read more &rarr;
                    </Link>

                    <p className="text-gray-400 text-sm mt-auto pt-4 border-t border-gray-200">
                        Published:{" "}
                        <time dateTime={data.addedDate}>
                            {new Date(data.addedDate).toLocaleDateString("vi-VN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </time>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HorizontalCard;
