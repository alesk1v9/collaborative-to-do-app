import { Router } from "express";
import authRoutes from "./auth-routes";
import userRoutes from "./user-routes";
import listRoutes from "./list-routes";
import taskRoutes from "./task-routes";
import listMemberRoutes from "./listMember-routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/lists", listRoutes);
router.use("/tasks", taskRoutes);
router.use("/list-members", listMemberRoutes);

export default router;