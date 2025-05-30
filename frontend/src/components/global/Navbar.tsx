import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt4 } from "react-icons/hi";
import images from "../../constants/images";
import {
    authLinks,
    HOME,
    links,
    LOGIN,
    REGISTRATION,
    SEARCH,
} from "../../constants/routes";
import { useAppSelector } from "../../redux/app/hooks";
import { selectAuth } from "../../redux/features/login/loginSlice";
import UserMenu from "./UserMenu";

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const { pathname } = useLocation();
    const isHidden = pathname === LOGIN || pathname === REGISTRATION;
    const { user, token } = useAppSelector(selectAuth);

    let userAvatar = null;
    if (user?.name) {
        userAvatar = <UserMenu />;
    }
    const navItems = user && token ? authLinks : links;

    const regularClass =
        "px-4 py-2 rounded-md font-semibold text-blue-800 hover:text-white hover:bg-orange-400 transition duration-300 ease-in-out cursor-pointer";
    const activeClass =
        "px-4 py-2 rounded-md font-semibold text-white bg-orange-500 shadow-md cursor-default";

    return (
        <nav>
            <div
                className={
                    isHidden
                        ? "hidden"
                        : "fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gradient-to-r from-white/70 via-white/50 to-white/70 shadow-md border-b border-gray-200"
                }
            >
                <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-12 py-3">
                    {/* Logo */}
                    <Link to={HOME} className="flex items-center">
                        <img
                            src={images.logo}
                            alt="HR_Books"
                            className="hidden sm:block w-[140px] md:w-[160px] lg:w-[200px] drop-shadow-md"
                        />
                        <img
                            src={images.logoSmall}
                            alt="HR_Books"
                            className="block sm:hidden w-10 mr-3"
                        />
                    </Link>

                    {/* SearchBar */}
                    <div className="flex-grow max-w-xl mx-6 hidden md:block">
                        <SearchBar />
                    </div>

                    {/* Nav & User */}
                    <div className="flex items-center space-x-4 md:space-x-6">
                        {userAvatar}

                        {/* Desktop menu */}
                        <ul className="hidden md:flex items-center gap-3">
                            {navItems.map((link) => (
                                <li key={link.id}>
                                    <Link to={link.link}>
                                        <span
                                            className={
                                                link.link === pathname
                                                    ? activeClass
                                                    : regularClass
                                            }
                                        >
                                            {link.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(true)}
                                aria-label="Open menu"
                                className="bg-orange-400 text-white p-2 rounded-full shadow-md hover:bg-orange-500 transition"
                            >
                                <HiMenuAlt4 className="text-2xl" />
                            </button>

                            {/* Mobile slide menu */}
                            {isOpen && (
                                <motion.div
                                    initial={{ x: 300 }}
                                    animate={{ x: 0 }}
                                    exit={{ x: 300 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white shadow-xl border-l border-gray-200 p-6 flex flex-col z-50"
                                >
                                    <div className="flex justify-end mb-6">
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            aria-label="Close menu"
                                            className="bg-orange-400 text-white p-2 rounded-full shadow-md hover:bg-orange-500 transition"
                                        >
                                            <AiOutlineClose className="text-2xl" />
                                        </button>
                                    </div>
                                    <ul className="flex flex-col gap-4 text-blue-900 font-semibold text-lg">
                                        {navItems.map((link) => (
                                            <li
                                                key={link.id}
                                                onClick={() => {
                                                    navigate(link.link);
                                                    setIsOpen(false);
                                                }}
                                                className="cursor-pointer hover:text-orange-500 transition"
                                            >
                                                {link.label}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

const SearchBar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [value, setValue] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const query = value.trim().replaceAll(" ", "+");
        if (query.length > 0) {
            navigate(`${SEARCH}?query=${query}`);
        }
    };

    useEffect(() => {
        if (!pathname.includes(SEARCH)) {
            setValue("");
        }
    }, [pathname]);

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex items-center rounded-full border border-gray-300 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-400 transition"
        >
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search for stories"
                className="flex-grow px-4 py-2 rounded-l-full text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 rounded-r-full p-2 flex items-center justify-center"
                aria-label="Search"
            >
                <svg
                    className="text-white w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 56.966 56.966"
                >
                    <path
                        d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
                    s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
                    c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
                    s-17-7.626-17-17S14.61,6,23.984,6z"
                    />
                </svg>
            </button>
        </form>
    );
};
