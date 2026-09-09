import type {
    Request,
    Response,
    NextFunction,
} from "express";

import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from "./products.service.js";

import type {
    CreateProductInput,
    ProductParams,
    UpdateProductInput,
} from "./products.types.js";

export async function createProductController(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const input =
            req.validated?.body as CreateProductInput;

        if (!input) {
            throw new Error(
                "Validated request body is missing",
            );
        }

        const product =
            await createProduct(input);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        next(error);
    }
}


export async function getProductsController(
    _req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const products =
            await getProducts();

        res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: products,
        });
    } catch (error) {
        next(error);
    }
}


export async function getProductByIdController(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const params =
            req.validated?.params as ProductParams | undefined;

        if (!params) {
            throw new Error(
                "Validated request parameters are missing",
            );
        }

        const product =
            await getProductById(
                params.id,
            );

        res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            data: product,
        });
    } catch (error) {
        next(error);
    }
}


export async function updateProductController(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const params =
            req.validated?.params as ProductParams | undefined;

        const input =
            req.validated?.body as UpdateProductInput;

        if (!params) {
            throw new Error(
                "Validated request parameters are missing",
            );
        }

        if (!input) {
            throw new Error(
                "Validated request body is missing",
            );
        }

        const product =
            await updateProduct(
                params.id,
                input,
            );

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    } catch (error) {
        next(error);
    }
}


export async function deleteProductController(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const params =
            req.validated?.params as ProductParams | undefined;

        if (!params) {
            throw new Error(
                "Validated request parameters are missing",
            );
        }

        await deleteProduct(params.id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}