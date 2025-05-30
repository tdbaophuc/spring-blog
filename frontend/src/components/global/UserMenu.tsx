import { Menu } from "@headlessui/react";
import { Fragment } from "react";
import { IconType } from "react-icons";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import { menuLinks, ROLE_ADMIN } from "../../constants/routes";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
    selectAuth,
    userLoggedOut,
} from "../../redux/features/login/loginSlice";

const UserMenu = () => {
    const { user } = useAppSelector(selectAuth);
    const dispatch = useAppDispatch();

    const checkRole = () => {
        const role = user?.roles?.find((role) => role.name === ROLE_ADMIN);
        return !!role;
    };

    const getLink = (
        link: string,
        isAdmin: boolean,
        active: boolean,
        label: string,
        icon: IconType
    ) => {
        let Icon = icon;
        let className = "";
        const activeClass = "bg-blue-600 text-white";
        const inActiveClass = "text-gray-700 hover:bg-blue-100";
        if (isAdmin && !checkRole()) className = "hidden";
        else if (isAdmin && checkRole() && active) className = activeClass;
        else if (isAdmin && checkRole() && !active) className = inActiveClass;
        else if (!isAdmin && active) className = activeClass;
        else if (!isAdmin && !active) className = inActiveClass;

        return (
            <Link to={link} className={`flex items-center py-2 px-4 rounded-md transition-colors ${className}`}>
                <Icon className="mr-2 text-lg" />
                <div className="truncate">{label}</div>
            </Link>
        );
    };

    return (
        <div className="relative">
            <Menu as="span" className="z-10 inline-block p-0 mx-2 w-max">
                <Menu.Button className="inline-block">
                    <div>
                        <div className="w-8 h-8 md:w-10 md:h-10 text-lg md:text-xl rounded-full text-white bg-blue-400 flex items-center justify-center font-bold uppercase select-none">
                            {user?.name.charAt(0)}
                        </div>
                    </div>
                </Menu.Button>

                <Menu.Items className="flex flex-col absolute right-0 top-12 min-w-[180px] bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 overflow-hidden">
                    <div className="py-1">
                        {menuLinks.map(({ link, label, id, icon, isAdmin }) => (
                            <Menu.Item key={id} as={Fragment}>
                                {({ active }) =>
                                    getLink(link, isAdmin, active, label, icon)
                                }
                            </Menu.Item>
                        ))}
                    </div>

                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => dispatch(userLoggedOut())}
                                    className={`flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-rose-500 hover:text-white transition-colors rounded-md ${
                                        active ? "bg-rose-500 text-white" : ""
                                    }`}
                                >
                                    <CiLogout className="mr-2 text-lg" />
                                    Signout
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Menu>
        </div>
    );
};

export default UserMenu;
