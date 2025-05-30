import { useEffect } from "react";
import TableHeader from "../../components/admin/TableHeader";
import TableRow from "../../components/admin/TableRow";

import Container from "../../components/global/Container";
import Message from "../../components/global/Message";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
    getUserList,
    selectUserList,
} from "../../redux/features/user-list/userListSlice";

const UsersList = () => {
    const { error, isError, isLoading, usersList } =
        useAppSelector(selectUserList);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUserList());
    }, [dispatch]);

    let showUserList = null;

    if (isLoading) {
        showUserList = (
            <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div
                        key={item}
                        className="w-full h-16 bg-gray-300 rounded-lg animate-pulse"
                    ></div>
                ))}
            </div>
        );
    } else if (isError) {
        showUserList = <Message error={true} message={error} />;
    } else if (usersList.length > 0) {
        showUserList = (
            <div className="space-y-3">
                {usersList.map((item) => (
                    <TableRow key={item.id} data={item} />
                ))}
            </div>
        );
    } else {
        showUserList = <Message error={false} message="No users available." />;
    }

    return (
        <Container>
            <div className="py-24 max-w-5xl mx-auto">
                <h1 className="text-center text-3xl text-primary font-extrabold mb-6 tracking-wide">
                    All Users
                </h1>

                <div className="overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-white">
                    <TableHeader />

                    <div className="divide-y divide-gray-200">{showUserList}</div>
                </div>
            </div>
        </Container>
    );
};

export default UsersList;
