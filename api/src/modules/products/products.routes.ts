import { Router } from "express";

import authenticate from "../../middleware/authenticate.js";
import validate from "../../middleware/validate.js";

import {
    createProductController,
    deleteProductController,
    getProductByIdController,
    getProductsController,
    updateProductController,
} from "./products.controller.js";

import {
    createProductSchema,
    productIdParamsSchema,
    productParamsSchema,
    updateProductSchema,
} from "./products.schema.js";


const router: Router = Router();


router.get(
    "/",
    authenticate,
    getProductsController,
);


router.get(
    "/:id",
    authenticate,
    validate(productParamsSchema),
    getProductByIdController,
);


router.post(
    "/",
    authenticate,
    validate(createProductSchema),
    createProductController,
);


router.patch(
    "/:id",
    authenticate,
    validate(updateProductSchema),
    updateProductController,
);


router.delete(
    "/:id",
    authenticate,
    validate(productParamsSchema),
    deleteProductController,
);


export default router;