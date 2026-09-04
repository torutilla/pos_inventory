import { z } from "zod";

export const categoryIdParamsSchema = z.object({
    id: z.uuid("Invalid category ID"),
});

export const createCategorySchema = z.object({
    body: z.object({
        name: z
            .string()
            .trim()
            .min(1, "Category name is required")
            .max(100, "Category name must not exceed 100 characters"),
    }),
});

export const updateCategorySchema = z.object({
    params: categoryIdParamsSchema,

    body: z.object({
        name: z
            .string()
            .trim()
            .min(1, "Category name cannot be empty")
            .max(100, "Category name must not exceed 100 characters"),
    }),
});

export const categoryParamsSchema = z.object({
    params: categoryIdParamsSchema,
});