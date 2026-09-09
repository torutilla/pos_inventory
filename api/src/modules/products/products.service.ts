import pool from "../../db/database.js";

import AppError from "../../utils/AppError.js";

import type {
    CreateProductInput,
    Product,
    UpdateProductInput,
} from "./products.types.js";


async function ensureCategoryExists(
    categoryId: string | null | undefined,
): Promise<void> {
    if (!categoryId) {
        return;
    }

    const result = await pool.query(
        `
            SELECT id
            FROM categories
            WHERE id = $1
            LIMIT 1;
        `,
        [categoryId],
    );

    if (result.rowCount === 0) {
        throw new AppError(
            "Category not found",
            404,
        );
    }
}


async function findDuplicateProductSku(
    sku: string,
    excludeId?: string,
): Promise<boolean> {
    const result = await pool.query(
        `
            SELECT id
            FROM products
            WHERE LOWER(sku) = LOWER($1)
              AND ($2::uuid IS NULL OR id != $2)
            LIMIT 1;
        `,
        [
            sku.trim(),
            excludeId ?? null,
        ],
    );

    return result.rowCount !== 0;
}


async function findDuplicateProductBarcode(
    barcode: string | null | undefined,
    excludeId?: string,
): Promise<boolean> {
    if (!barcode) {
        return false;
    }

    const result = await pool.query(
        `
            SELECT id
            FROM products
            WHERE barcode = $1
              AND ($2::uuid IS NULL OR id != $2)
            LIMIT 1;
        `,
        [
            barcode.trim(),
            excludeId ?? null,
        ],
    );

    return result.rowCount !== 0;
}


export async function createProduct(
    input: CreateProductInput,
): Promise<Product> {
    await ensureCategoryExists(
        input.category_id,
    );

    const duplicateSku =
        await findDuplicateProductSku(
            input.sku,
        );

    if (duplicateSku) {
        throw new AppError(
            "A product with this SKU already exists",
            409,
        );
    }

    const duplicateBarcode =
        await findDuplicateProductBarcode(
            input.barcode,
        );

    if (duplicateBarcode) {
        throw new AppError(
            "A product with this barcode already exists",
            409,
        );
    }

    const result = await pool.query<Product>(
        `
            INSERT INTO products (
                category_id,
                name,
                sku,
                barcode,
                description,
                cost_price,
                selling_price,
                minimum_stock
            )
            VALUES (
                $1, $2, $3, $4,
                $5, $6, $7, $8
            )
            RETURNING
                id,
                category_id,
                name,
                sku,
                barcode,
                description,
                cost_price,
                selling_price,
                stock_quantity,
                minimum_stock,
                is_active,
                created_at,
                updated_at;
        `,
        [
            input.category_id ?? null,
            input.name,
            input.sku,
            input.barcode ?? null,
            input.description ?? null,
            input.cost_price,
            input.selling_price,
            input.minimum_stock ?? 0,
        ],
    );

    const product = result.rows[0];

    if (!product) {
        throw new AppError(
            "Failed to create product",
            500,
        );
    }

    return product;
}


export async function getProducts(): Promise<Product[]> {
    const result = await pool.query<Product>(
        `
            SELECT
                id,
                category_id,
                name,
                sku,
                barcode,
                description,
                cost_price,
                selling_price,
                stock_quantity,
                minimum_stock,
                is_active,
                created_at,
                updated_at
            FROM products
            ORDER BY name ASC;
        `,
    );

    return result.rows;
}


export async function getProductById(
    id: string,
): Promise<Product> {
    const result = await pool.query<Product>(
        `
            SELECT
                id,
                category_id,
                name,
                sku,
                barcode,
                description,
                cost_price,
                selling_price,
                stock_quantity,
                minimum_stock,
                is_active,
                created_at,
                updated_at
            FROM products
            WHERE id = $1;
        `,
        [id],
    );

    const product = result.rows[0];

    if (!product) {
        throw new AppError(
            "Product not found",
            404,
        );
    }

    return product;
}


export async function updateProduct(
    id: string,
    input: UpdateProductInput,
): Promise<Product> {
    const existingProduct =
        await getProductById(id);

    const finalCategoryId =
        "category_id" in input
            ? input.category_id
            : existingProduct.category_id;

    const finalSku =
        input.sku ?? existingProduct.sku;

    const finalBarcode =
        "barcode" in input
            ? input.barcode
            : existingProduct.barcode;

    await ensureCategoryExists(
        finalCategoryId,
    );

    const duplicateSku =
        await findDuplicateProductSku(
            finalSku,
            id,
        );

    if (duplicateSku) {
        throw new AppError(
            "A product with this SKU already exists",
            409,
        );
    }

    const duplicateBarcode =
        await findDuplicateProductBarcode(
            finalBarcode,
            id,
        );

    if (duplicateBarcode) {
        throw new AppError(
            "A product with this barcode already exists",
            409,
        );
    }

    const allowedFields = [
        "category_id",
        "name",
        "sku",
        "barcode",
        "description",
        "cost_price",
        "selling_price",
        "minimum_stock",
        "is_active",
    ] as const;

    const updates: string[] = [];
    const values: unknown[] = [];

    for (const field of allowedFields) {
        if (field in input) {
            values.push(input[field]);

            updates.push(
                `${field} = $${values.length}`,
            );
        }
    }

    updates.push(
        "updated_at = NOW()",
    );

    values.push(id);

    const result = await pool.query<Product>(
        `
            UPDATE products
            SET ${updates.join(", ")}
            WHERE id = $${values.length}
            RETURNING
                id,
                category_id,
                name,
                sku,
                barcode,
                description,
                cost_price,
                selling_price,
                stock_quantity,
                minimum_stock,
                is_active,
                created_at,
                updated_at;
        `,
        values,
    );

    const product = result.rows[0];

    if (!product) {
        throw new AppError(
            "Product not found",
            404,
        );
    }

    return product;
}


export async function deleteProduct(
    id: string,
): Promise<void> {
    const result = await pool.query(
        `
            DELETE FROM products
            WHERE id = $1
            RETURNING id;
        `,
        [id],
    );

    if (result.rowCount === 0) {
        throw new AppError(
            "Product not found",
            404,
        );
    }
}