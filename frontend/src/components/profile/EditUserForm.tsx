import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/app/hooks";
import { selectAuth } from "../../redux/features/login/loginSlice";
import axios from "../../utils/axiosInstance"; // dùng axios cấu hình sẵn nếu có
import { toast } from "react-toastify";

const EditUserForm = () => {
    const { user } = useAppSelector(selectAuth);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        about: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                about: user.about || "",
            });
        }
    }, [user]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user?.id) {
            toast.error("Invalid user ID");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.put(`/api/users/${user.id}`, formData,
                { headers: { "Content-Type": "application/json" },  }
            );

            if (response?.data?.message) {
                toast.success(response.data.message);
            } else {
                toast.success("Profile updated successfully!");
            }
        } catch (error: any) {
            const errorMsg =
                typeof error === "string"
                    ? error
                    : error?.response?.data?.message ||
                      error?.message ||
                      "Update failed.";
            toast.error(errorMsg);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="border px-3 py-2 rounded"
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border px-3 py-2 rounded"
            />
            <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                placeholder="About"
                className="border px-3 py-2 rounded resize-none"
                rows={4}
            />
            <button
                type="submit"
                disabled={loading}
                className={`${
                    loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } text-white py-2 px-4 rounded`}
            >
                {loading ? "Saving..." : "Save Changes"}
            </button>
        </form>
    );
};

export default EditUserForm;
