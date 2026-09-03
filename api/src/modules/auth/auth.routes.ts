import { Router } from "express";

import { getCurrentUser, loginController } from "./auth.controller.js";
import authenticate from "../../middleware/authenticate.js";

const router = Router();

router.post("/login", loginController);

router.get(
    "/me",
    authenticate,
    getCurrentUser,
);


export default router;