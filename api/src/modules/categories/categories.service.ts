import pool from "../../db/database.js";
import AppError from "../../utils/AppError.js";

import type {
    Category,
    CreateCategoryInput,
    UpdateCategoryInput
} from "./categories.types.js";

export async function getAllCategories(): Promise<Category[]> {
    const result = await pool.query<Category>(
        `
      SELECT
        id,
        name,
        created_at,
        updated_at
      FROM categories
      ORDER BY name ASC;
    `,
    );

    return result.rows;
}

export async function createCategory(
    input: CreateCategoryInput,
): Promise<Category> {
    const { name } = input;

    try {
        const result = await pool.query<Category>(
            `
        INSERT INTO categories (
          name
        )
        VALUES ($1)
        RETURNING
          id,
          name,
          created_at,
          updated_at;
      `,
            [name],
        );

        const category = result.rows[0];

        if (!category) {
            throw new AppError(
                "Failed to create category",
                500,
            );
        }

        return category;
    } catch (error) {

        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "23505"
        ) {
            throw new AppError(
                "A category with this name already exists",
                409,
            );
        }

        throw error;
    }
}

export async function getCategoryById(
    id: string,
): Promise<Category> {
    const result = await pool.query<Category>(
        `
      SELECT
        id,
        name,
        created_at,
        updated_at
      FROM categories
      WHERE id = $1;
    `,
        [id],
    );

    const category = result.rows[0];

    if (!category) {
        throw new AppError(
            "Category not found",
            404,
        );
    }

    return category;
}

export async function updateCategory(
    id: string,
    input: UpdateCategoryInput,
): Promise<Category> {
    const { name } = input;

    try {
        const result = await pool.query<Category>(
            `
        UPDATE categories
        SET
          name = $1,
          updated_at = NOW()
        WHERE id = $2
        RETURNING
          id,
          name,
          created_at,
          updated_at;
      `,
            [name, id],
        );

        const category = result.rows[0];

        if (!category) {
            throw new AppError(
                "Category not found",
                404,
            );
        }

        return category;
    } catch (error) {
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === "23505"
        ) {
            throw new AppError(
                "A category with this name already exists",
                409,
            );
        }

        throw error;
    }
}

export async function deleteCategory(
    id: string,
): Promise<void> {
    const result = await pool.query(
        `
      DELETE FROM categories
      WHERE id = $1;
    `,
        [id],
    );

    if (result.rowCount === 0) {
        throw new AppError(
            "Category not found",
            404,
        );
    }
}