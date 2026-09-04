import { Router } from "express";
import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";
import validate from "../../middleware/validate.js";
import { categoryIdParamsSchema, createCategorySchema, updateCategorySchema } from "./categories.schema.js";
import { createCategoryController, deleteCategoryController, getAllCategoriesController, getCategoryByIdController, updateCategoryController } from "./categories.controller.js";

const router: Router = Router();

router.get('/categories', authenticate, getAllCategoriesController);

router.post('/categories', authenticate, authorize("OWNER", "MANAGER"), validate(createCategorySchema), createCategoryController);

router.get('/categories/:id', authenticate, validate(categoryIdParamsSchema), getCategoryByIdController);

router.patch('/categories/:id', authorize("OWNER", "MANAGER"), validate(updateCategorySchema), updateCategoryController);

router.delete('/categories/:id', authorize("OWNER"), validate(categoryIdParamsSchema), deleteCategoryController);