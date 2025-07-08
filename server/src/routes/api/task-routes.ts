import { Router, Request, Response } from "express";
import { User, List, Task } from "../../models/index";
import { TaskProps } from "../../types/task";
import { isListOwner, isListMember, isAuthenticated } from "../../middleware/authMiddleware";


const router = Router();

// Get all tasks
router.get("/", async (req: Request, res: Response) => {
    try {
        const tasks: TaskProps[] = await Task.findAll({
            include: [
                {
                    model: List,
                    attributes: ["id", "name"],
                },
                {
                    model: User,
                    as: "assignedTo",
                    attributes: ["id", "name"],
                },
            ],
        });
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get a task by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const task: TaskProps | null = await Task.findByPk(taskId, {
            include: [
                {
                    model: List,
                    attributes: ["id", "name"],
                },
                {
                    model: User,
                    as: "assignedTo",
                    attributes: ["id", "name"],
                },
            ],
        });

        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ error: "Task not found" });
        }
    } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Create a new task
router.post("/", isListOwner, async (req: Request, res: Response) => {
    try {
        const newTask: TaskProps = req.body;
        const createdTask = await Task.create(newTask);
        res.status(201).json(createdTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update a task by ID
router.put("/:id", isListOwner, async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const updatedData: Partial<TaskProps> = req.body;

        const task = await Task.findByPk(taskId);
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        
        Object.assign(task, updatedData);

        const updatedTasks = await task.save();
        if (updatedTasks) {
            res.status(200).json(updatedTasks);
        } else {
            res.status(404).json({ error: "Task not found" });
        }
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Delete a task by ID
router.delete("/:id", isListOwner, async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const deletedCount = await Task.destroy({ where: { id: taskId } });

        if (deletedCount) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Task not found" });
        }
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Mark a task as completed
router.patch("/:id/complete", isListOwner || isListMember, async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const { completedById } = req.body;

        const task = await Task.findByPk(taskId);
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }

        task.isCompleted = true;
        task.completedById = completedById;
        await task.save();
        res.status(200).json(task);

    } catch (error) {
        console.error("Error completing task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Assign a task to a user
router.patch("/:id/assign", isListOwner, async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const { assignedToId } = req.body;

        const task = await Task.findByPk(taskId);
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }

        task.assignedToId = assignedToId;
        await task.save();
        res.status(200).json(task);

    } catch (error) {
        console.error("Error assigning task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get tasks by list ID
router.get("/list/:listId", isListOwner || isListMember, async (req: Request, res: Response) => {
    try {
        const listId = req.params.listId;
        const tasks: TaskProps[] = await Task.findAll({
            where: { listId },
            include: [
                {
                    model: List,
                    attributes: ["id", "name"],
                },
                {
                    model: User,
                    as: "assignedTo",
                    attributes: ["id", "username"],
                },
            ],
        });
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks by list ID:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;