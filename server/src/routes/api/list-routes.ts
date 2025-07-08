import { Router, Request, Response } from "express";
import { List, Task, User, ListMember } from "../../models/index";
import { isListOwner, isListMember, isAuthenticated, isOwnerOrMember } from "../../middleware/authMiddleware";
import { ListProps } from "../../types/list";

const router = Router();

// Get all lists
router.get("/", async (req: Request, res: Response) => {
    try {
        const lists = await List.findAll({
            include: [
                {
                    model: User,
                    attributes: ["id", "name", "email"],
                },
                {
                    model: Task,
                    attributes: ["id", "title", "isCompleted", "dueDate", "priority", "listId", "completedById", "assignedToId"],
                },
            ],
        });

        if (!lists) {
            res.status(404).json({ error: "No lists found" });
            return;
        }
        res.status(200).json(lists);
    } catch (error) {
        console.error("Error fetching lists:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get a single list by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const listId = req.params.id;
        const list = await List.findByPk(listId, {
            include: [
                {
                    model: User,
                    attributes: ["id", "name", "email"],
                },
                {
                    model: Task,
                    attributes: ["id", "title", "isCompleted", "dueDate", "priority", "listId", "completedById", "assignedToId"],
                },
            ],
        });

        if (list) {
            res.status(200).json(list);
        } else {
            res.status(404).json({ error: "list not found" });
        }
    } catch (error) {
        console.error("Error fetching list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Create a new list
router.post("/", isAuthenticated, async (req: Request, res: Response) => {
    try {
        const { name, userId } = req.body!;

        if (!name || !userId) {
            res.status(400).json({ error: "Name and userId are required" });
        }

        const newList = await List.create({ name, userId });

        await ListMember.create({
            listId: newList.id,
            userId: userId,
            role: "owner", // Assuming the creator is the owner
        });

        res.status(201).json(newList);
    } catch (error) {
        console.error("Error creating list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update a list by ID
router.put("/:id", isListOwner ,async (req: Request, res: Response) => {
    try {
        const listId = req.params.id;
        const { name } = req.body;

        if (!name) {
            res.status(400).json({ error: "Name is required" });
            return;
        }

        const updated = await List.update(
            { name },
            { where: { id: listId }, returning: true }
        );

        if (updated) {
            res.status(200).json(updated);
        } else {
            res.status(404).json({ error: "List not found" });
        }
    } catch (error) {
        console.error("Error updating list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Delete a list by ID
router.delete("/:id", isListOwner, async (req: Request, res: Response) => {
    try {
        const listId = req.params.id;

        const deleted = await List.destroy({ where: { id: listId } });

        if (deleted) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ error: "List not found" });
        }
    } catch (error) {
        console.error("Error deleting list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;