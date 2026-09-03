import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import authenticate from "../middleware/authenticate.js";
import authorize from "../middleware/authorize.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API is running",
    });
});

router.use("/auth", authRoutes);

router.get(
    "/admin-test",
    authenticate,
    authorize("OWNER"),
    (req, res) => {
        res.json({
            success: true,
            message: "You have owner access",
        });
    },
);

export default router;