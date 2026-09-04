import { Router } from "express";
import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";
import validate from "../../middleware/validate.js";
import { categoryParamsSchema, createCategorySchema, updateCategorySchema } from "./categories.schema.js";
import { createCategoryController, deleteCategoryController, getAllCategoriesController, getCategoryByIdController, updateCategoryController } from "./categories.controller.js";

const router: Router = Router();

router.get(
    '/',
    authenticate,
    getAllCategoriesController
);

router.post(
    '/create',
    authenticate,
    authorize("OWNER", "MANAGER"),
    validate(createCategorySchema),
    createCategoryController
);

router.get(
    '/:id',
    authenticate,
    validate(categoryParamsSchema),
    getCategoryByIdController
);

router.patch(
    '/:id',
    authenticate,
    authorize("OWNER", "MANAGER"),
    validate(updateCategorySchema),
    updateCategoryController
);

router.delete(
    '/:id',
    authenticate,
    authorize("OWNER"),
    validate(categoryParamsSchema),
    deleteCategoryController
);

export default router;