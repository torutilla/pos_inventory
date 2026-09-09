export interface Product {
    id: string;
    category_id: string | null;

    name: string;
    sku: string;
    barcode: string | null;
    description: string | null;

    cost_price: string;
    selling_price: string;

    stock_quantity: number;
    minimum_stock: number;

    is_active: boolean;

    created_at: Date;
    updated_at: Date;
}

export interface CreateProductInput {
    category_id?: string | null;

    name: string;
    sku: string;

    barcode?: string | null;
    description?: string | null;

    cost_price: number;
    selling_price: number;

    minimum_stock?: number;
}

export interface UpdateProductInput {
    category_id?: string | null;

    name?: string;
    sku?: string;

    barcode?: string | null;
    description?: string | null;

    cost_price?: number;
    selling_price?: number;

    minimum_stock?: number;
    is_active?: boolean;
}

export interface ProductParams {
    id: string;
}