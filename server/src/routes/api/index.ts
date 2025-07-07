import { Router } from "express";
import authRoutes from "./auth-routes";
import userRoutes from "./user-routes";
import listRoutes from "./list-routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/lists", listRoutes);

export default router;