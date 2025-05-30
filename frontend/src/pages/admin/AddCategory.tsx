import { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    addCategory,
    deleteCategory,
    getCategory,
    updateCategory,
} from "../../redux/features/categories/categorySlice";
import Container from "../../components/global/Container";
import Title from "../../components/global/Title";
import Input from "../../components/global/Input";
import Textarea from "../../components/global/Textarea";
import Button from "../../components/global/Button";
import { RootState } from "../../redux/app/store";
import axios from "../../utils/axiosInstance";

const CategoryManager = () => {
    const dispatch = useDispatch();
    const { categories, isLoading: loading } = useSelector((state: RootState) => state.category);
    const [catName, setCatName] = useState("");
    const [description, setDescription] = useState("");
    const [editId, setEditId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(getCategory() as any);
    }, [dispatch]);

    const handleSubmit = async () => {
        if (!catName || !description) {
            toast.error("Please enter both title and description");
            return;
        }

        const payload = {
            categoryTitle: catName,
            categoryDescription: description,
        };

        try {
            if (editId !== null) {
                // Sửa: dispatch đúng tham số cho updateCategory
                await dispatch(updateCategory({ id: editId, title: payload.categoryTitle, description: payload.categoryDescription }) as any);
                toast.success("Category updated!");
            } else {
                // Thêm category mới qua axios và dispatch addCategory
                const res = await axios.post("/api/category", payload);
                dispatch(addCategory.fulfilled(res.data, "", { title: catName, description }));
                toast.success("Category added!");
            }

            setCatName("");
            setDescription("");
            setEditId(null);
        } catch (err: any) {
            toast.error(err?.message || "Failed");
        }
    };

    const handleEdit = (cat: any) => {
        setCatName(cat.categoryTitle);
        setDescription(cat.categoryDescription);
        setEditId(cat.categoryId);
    };

    const handleDelete = async (id: number) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure?")) {
            try {
                await dispatch(deleteCategory(id) as any);
                toast.success("Deleted!");
            } catch {
                toast.error("Cannot delete category.");
            }
        }
    };

    return (
        <Container>
            <div className="pt-24 lg:w-3/5 mx-auto">
                <Title title="Manage Categories" />
                <div className="space-y-4">
                    <Input
                        label="Category Name"
                        value={catName}
                        onChange={(e) => setCatName(e.target.value)}
                        placeholder="Enter category name"
                    />
                    <Textarea
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                    />
                    <Button
                        title={editId !== null ? "Update Category" : "Add Category"}
                        onClick={handleSubmit}
                        loading={loading}
                    />
                </div>

                <div className="mt-10">
                    <h2 className="text-xl font-bold mb-4">Category List</h2>
                    {categories.map((cat: any) => (
                        <div
                            key={cat.categoryId}
                            className="flex items-center justify-between border p-3 mb-2 rounded-md shadow"
                        >
                            <div>
                                <p className="font-semibold">{cat.categoryTitle}</p>
                                <p className="text-sm text-gray-600">{cat.categoryDescription}</p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    onClick={() => handleEdit(cat)}
                                    className="px-3 py-1 bg-yellow-400 text-white rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(cat.categoryId)}
                                    className="px-3 py-1 bg-red-500 text-white rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default CategoryManager;
