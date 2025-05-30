import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ERR_MSG } from "../../../constants/common";
import { Category } from "../../../types/types";
import { RootState } from "../../app/store";
import { fetchCategory } from "./categoriesApi";
import axios from "../../../utils/axiosInstance";

interface CategoryState {
    isError: boolean;
    isLoading: boolean;
    error: string | undefined;
    categories: Category[];
    activeCategory: string;
}

const initialState: CategoryState = {
    isError: false,
    isLoading: false,
    categories: [],
    error: "",
    activeCategory: "",
};

// GET all categories
export const getCategory = createAsyncThunk(
    "category/getCategory",
    async () => {
        const categories = await fetchCategory();
        return categories;
    }
);

// ADD category
export const addCategory = createAsyncThunk(
    "category/addCategory",
    async (data: { title: string; description: string }) => {
        const res = await axios.post("/api/category", {
            categoryTitle: data.title,
            categoryDescription: data.description,
        });
        return res.data;
    }
);

// UPDATE category
export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async (data: { id: number; title: string; description: string }) => {
        const res = await axios.put(`/api/category/${data.id}`, {
            categoryTitle: data.title,
            categoryDescription: data.description,
        });
        return res.data;
    }
);

// DELETE category
export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (id: number) => {
        await axios.delete(`/api/category/${id}`);
        return id;
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        updateActiveCategory: (state, action) => {
            const existing = state.categories.find(
                (item) => item.categoryId === Number(action.payload)
            );
            state.activeCategory = existing ? existing.categoryTitle : action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // GET categories
            .addCase(getCategory.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
                state.error = "";
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message || ERR_MSG;
            })

            // ADD category
            .addCase(addCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
            })

            // UPDATE category
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.categories.findIndex(
                    (cat) => cat.categoryId === action.payload.categoryId
                );
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            })

            // DELETE category
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categories = state.categories.filter(
                    (cat) => cat.categoryId !== action.payload
                );
            });
    },
});

export const { updateActiveCategory } = categorySlice.actions;
export const selectCategory = (state: RootState) => state.category;
export default categorySlice.reducer;

