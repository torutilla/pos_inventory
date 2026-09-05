import { Router } from "express";
import authenticate from "../../middleware/authenticate.js";
import {
    createSupplierController,
    deleteSupplierController,
    getAllSuppliersController,
    getSupplierByIdController,
    updateSupplierController
} from "./supplier.controller.js";
import validate from "../../middleware/validate.js";
import {
    createSupplierSchema,
    supplierParamsSchema,
    updateSupplierSchema
} from "./supplier.schema.js";
import authorize from "../../middleware/authorize.js";

const router: Router = Router();

router.get(
    '/',
    authenticate,
    getAllSuppliersController
);

router.get(
    '/:id',
    authenticate,
    validate(supplierParamsSchema),
    getSupplierByIdController
);

router.post(
    '/create',
    authenticate,
    authorize("OWNER", "MANAGER"),
    validate(createSupplierSchema),
    createSupplierController
);

router.patch(
    '/:id',
    authenticate,
    authorize("OWNER", "MANAGER"),
    validate(updateSupplierSchema),
    updateSupplierController
);

router.delete(
    '/:id',
    authenticate,
    authorize("OWNER"),
    validate(supplierParamsSchema),
    deleteSupplierController,
);


export default router;