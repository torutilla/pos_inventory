import { Router } from "express";

import { getCurrentUser, loginController } from "./auth.controller.js";
import authenticate from "../../middleware/authenticate.js";
import validate from "../../middleware/validate.js";
import { loginSchema } from "./auth.schema.js";

const router: Router = Router();

router.post("/login", validate(loginSchema), loginController);

router.get(
    "/me",
    authenticate,
    getCurrentUser,
);


export default router;