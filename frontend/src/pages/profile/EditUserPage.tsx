import EditUserForm from "../../components/profile/EditUserForm";

const EditUserPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Update Profile</h1>
                <EditUserForm />
            </div>
        </div>
    );
};

export default EditUserPage;
