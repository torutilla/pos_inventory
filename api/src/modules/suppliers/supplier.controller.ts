import type {
    NextFunction,
    Request,
    Response,
} from "express";

import {
    createSupplier,
    deleteSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
} from "./supplier.service.js";

import type {
    CreateSupplierInput,
    UpdateSupplierInput,
} from "./supplier.types.js";

import {
    getValidatedBody,
    getValidatedParams,
} from "../../utils/validatedRequest.js";

import { sendSuccess } from "../../utils/response.js";

interface SupplierParams {
    id: string;
}

export async function getAllSuppliersController(
    _req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const suppliers = await getAllSuppliers();

        sendSuccess(res, {
            message: "Suppliers retrieved successfully",
            data: {
                suppliers,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getSupplierByIdController(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const { id } =
            getValidatedParams<SupplierParams>(req);

        const supplier = await getSupplierById(id);

        sendSuccess(res, {
            message: "Supplier retrieved successfully",
            data: {
                supplier,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function createSupplierController(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const body =
            getValidatedBody<CreateSupplierInput>(req);

        const supplier =
            await createSupplier(body);

        res.status(201);

        sendSuccess(res, {
            message: "Supplier created successfully",
            data: {
                supplier,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function updateSupplierController(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const { id } =
            getValidatedParams<SupplierParams>(req);

        const body =
            getValidatedBody<UpdateSupplierInput>(req);

        const supplier =
            await updateSupplier(id, body);

        sendSuccess(res, {
            message: "Supplier updated successfully",
            data: {
                supplier,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteSupplierController(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const { id } =
            getValidatedParams<SupplierParams>(req);

        await deleteSupplier(id);

        sendSuccess(res, {
            message: "Supplier deleted successfully",
            data: null,
        });
    } catch (error) {
        next(error);
    }
}