import { Router } from "express";
import authRoutes from "./auth-routes";
import userRoutes from "./user-routes";
import listRoutes from "./list-routes";
import taskRoutes from "./task-routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/lists", listRoutes);
router.use("/tasks", taskRoutes);

export default router;