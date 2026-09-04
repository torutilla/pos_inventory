import type {
    NextFunction,
    Request,
    Response,
} from "express";

import {
    createCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
} from "./categories.service.js";

import type { CategoryParams } from "./categories.types.js";

import { sendSuccess } from "../../utils/response.js";
import { getValidatedParams } from "../../utils/validatedRequest.js";

export async function getAllCategoriesController(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const categories = await getAllCategories();

        sendSuccess(res, {
            message: "Categories retrieved successfully",
            data: {
                categories,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getCategoryByIdController(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {

        const { id } = getValidatedParams<CategoryParams>(req);

        const category = await getCategoryById(id);

        sendSuccess(res, {
            message: "Category retrieved successfully",
            data: {
                category,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function createCategoryController(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const category = await createCategory(req.body);

        res.status(201);

        sendSuccess(res, {
            message: "Category created successfully",
            data: {
                category,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function updateCategoryController(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {

        const { id } = getValidatedParams<CategoryParams>(req);

        const category = await updateCategory(
            id,
            req.body,
        );

        sendSuccess(res, {
            message: "Category updated successfully",
            data: {
                category,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteCategoryController(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const { id } = getValidatedParams<CategoryParams>(req);

        await deleteCategory(id);

        sendSuccess(res, {
            message: "Category deleted successfully",
            data: null,
        });
    } catch (error) {
        next(error);
    }
}