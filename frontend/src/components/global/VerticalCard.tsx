import { motion } from "framer-motion";
import moment from "moment";
import { Link } from "react-router-dom";
import { AVATAR_URL } from "../../constants/common";
import { BLOG_IMAGE_ENDPOINT, STORY } from "../../constants/routes";
import { PRIMARY } from "../../constants/theme";
import { Post } from "../../types/types";
import CategoryBtn from "./CategoryBtn";
import UserInfo from "./UserInfo";

interface IProps {
    data: Post;
}

const VerticalCard = ({ data }: IProps) => {
    const addedDate = moment(data.addedDate).format("DD MMM, YY");

    return (
        <motion.div
            key="modal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="rounded-md shadow-md bg-gray-50 overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
            <Link to={`${STORY}/${data.id}`} className="block">
                <div className="overflow-hidden rounded-t-md">
                    <img
                        alt="blog_image"
                        className="w-full h-[200px] sm:h-[300px] object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                        src={BLOG_IMAGE_ENDPOINT + data?.imageName}
                    />
                </div>

                <div className="px-4 pt-4 pb-5 flex flex-col h-full">
                    <UserInfo
                        name={data.users.name}
                        avatar={AVATAR_URL}
                    />

                    <h2 className="mt-3 mb-2 text-xl font-semibold text-gray-800 hover:underline hover:cursor-pointer line-clamp-2">
                        {data.title}
                    </h2>

                    <div
                        className="text-gray-600 text-md mb-3 line-clamp-3"
                        style={{ fontSize: "16px" }}
                        dangerouslySetInnerHTML={{ __html: data.content }}
                    />

                    <button
                        className="self-start text-rose-500 hover:underline focus:outline-none mb-4"
                        aria-label="Read more about the story"
                    >
                        Read more..
                    </button>

                    <div className="mt-auto flex justify-between items-center">
                        <CategoryBtn
                            name={data.category.categoryTitle}
                            color={PRIMARY}
                        />
                        <p className="text-gray-400 text-sm">
                            Published:{" "}
                            <span className="font-semibold">{addedDate}</span>
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default VerticalCard;
