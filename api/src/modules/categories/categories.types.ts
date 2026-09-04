export interface Category {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateCategoryInput {
    name: string;
}

export interface UpdateCategoryInput {
    name: string;
}

export interface CategoryParams {
    id: string;
}