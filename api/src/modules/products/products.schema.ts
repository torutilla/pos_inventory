import { z } from "zod";

export const productIdParamsSchema = z.object({
    id: z.uuid("Invalid product ID"),
});

export const productParamsSchema = z.object({
    params: productIdParamsSchema,
});

const productFieldsSchema = {
    category_id: z.uuid("Invalid category ID").nullable().optional(),

    name: z
        .string()
        .trim()
        .min(1, "Product name is required")
        .max(150, "Product name must not exceed 150 characters"),

    sku: z
        .string()
        .trim()
        .min(1, "SKU is required")
        .max(50, "SKU must not exceed 50 characters"),

    barcode: z
        .string()
        .trim()
        .min(1, "Barcode cannot be empty")
        .max(100, "Barcode must not exceed 100 characters")
        .nullable()
        .optional(),

    description: z
        .string()
        .trim()
        .max(5000, "Description must not exceed 5000 characters")
        .nullable()
        .optional(),

    cost_price: z
        .number()
        .min(0, "Cost price cannot be negative"),

    selling_price: z
        .number()
        .min(0, "Selling price cannot be negative"),

    minimum_stock: z
        .number()
        .int("Minimum stock must be a whole number")
        .min(0, "Minimum stock cannot be negative")
        .optional(),

    is_active: z.boolean().optional(),
}

export const createProductSchema = z.object({
    body: z.object({
        category_id: productFieldsSchema.category_id,
        name: productFieldsSchema.name,
        sku: productFieldsSchema.sku,
        barcode: productFieldsSchema.barcode,
        description: productFieldsSchema.description,
        cost_price: productFieldsSchema.cost_price,
        selling_price: productFieldsSchema.selling_price,
        minimum_stock: productFieldsSchema.minimum_stock,
    }),
});

export const updateProductSchema = z.object({
    params: productIdParamsSchema,

    body: z
        .object({
            category_id: productFieldsSchema.category_id,
            name: productFieldsSchema.name.optional(),
            sku: productFieldsSchema.sku.optional(),
            barcode: productFieldsSchema.barcode,
            description: productFieldsSchema.description,
            cost_price: productFieldsSchema.cost_price.optional(),
            selling_price: productFieldsSchema.selling_price.optional(),
            minimum_stock: productFieldsSchema.minimum_stock,
            is_active: productFieldsSchema.is_active,
        })
        .refine(
            (body) => Object.keys(body).length > 0,
            {
                message: "At least one field must be provided",
            },
        ),
});