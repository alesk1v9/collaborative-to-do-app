import { Router, Request, Response } from "express";
import { User, ListMember, List } from "../../models/index";
import { isListOwner, isListMember, isAuthenticated, isOwnerOrMember } from "../../middleware/authMiddleware";

const router = Router();

// Get all members of a list
router.get("/:listId/members", isOwnerOrMember, async (req: Request, res: Response) => {
    const listId = req.params.listId;
    try {
        const members = await ListMember.findAll({
            where: { listId },
            include: [{ model: User, attributes: ["id", "name", "email"] }],
        });
        res.status(200).json(members);
    } catch (error) {
        console.error("Error fetching list members:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Add a member to a list
router.post("/:listId/members", isListOwner, async (req: Request, res: Response) => {
    const listId = +req.params.listId;
    const { userId, role } = req.body;

    try {
        // Check if the user is already a member of the list
        const existingMember = await ListMember.findOne({
            where: { listId, userId },
        });

        if (existingMember) {
            res.status(400).json({ error: "User is already a member of this list." });
            return;
        }

        const newMember = await ListMember.create({ listId, userId, role });
        res.status(201).json(newMember);
    } catch (error) {
        console.error("Error adding member to list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Remove a member from a list
router.delete("/:listId/members/:userId", isListOwner, async (req: Request, res: Response) => {
    const listId = +req.params.listId;
    const userId = +req.params.userId;

    try {
        const member = await ListMember.findOne({ where: { listId, userId } });

        if (!member) {
            res.status(404).json({ error: "Member not found in this list." });
            return;
        }

        await member.destroy();
        res.status(204).send();
    } catch (error) {
        console.error("Error removing member from list:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update a member's role in a list
router.put("/:listId/members/:userId", isListOwner, async (req: Request, res: Response) => {
    const listId = +req.params.listId;
    const userId = +req.params.userId;
    const { role } = req.body;

    try {
        const member = await ListMember.findOne({ where: { listId, userId } });

        if (!member) {
            res.status(404).json({ error: "Member not found in this list." });
            return;
        }

        member.role = role;
        await member.save();
        res.status(200).json(member);
    } catch (error) {
        console.error("Error updating member role:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get all lists a user is a member of
router.get("/user/:userId/lists", isAuthenticated, async (req: Request, res: Response) => {
    const userId = +req.params.userId;

    try {
        const lists = await ListMember.findAll({
            where: { userId },
            include: [{ model: List, attributes: ["id", "name"] }],
        });

        if (lists.length === 0) {
            res.status(404).json({ error: "No lists found for this user." });
            return;
        }

        res.status(200).json(lists);
    } catch (error) {
        console.error("Error fetching lists for user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;