import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { List, ListMember } from "../models/index";

dotenv.config();


export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        (req as any).user = decoded; // Attach user info to request object
        next();
    } catch (err) {
        res.status(401).json({ message: "Token invalid or expired" });
    }
};

export const isListOwner = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');
  const listId = +req.params.listId;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
     

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const list = await List.findByPk(listId);
    if (!list || list.userId !== decoded.id) {
       res.status(403).json({ message: "Only the list owner can do this" });
         return;
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid or expired" });
  }
};

export const isListMember = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');
  const listId = +req.params.listId;

  if (!token){
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const listMember = await ListMember.findOne({
      where: { listId, userId: decoded.id }
    });

    if (!listMember) {
        res.status(403).json({ message: "You are not a member of this list" });
        return;
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid or expired" });
  }
};

export const isOwnerOrMember = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');
  const listId = +req.params.listId;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const listMember = await ListMember.findOne({
      where: { listId, userId: decoded.id }
    });

    let isOwner = false;
    const list = await List.findByPk(listId);
    if (list && list.userId === decoded.id) {
      isOwner = true;
    }

    if (!listMember && !isOwner) {
      res.status(403).json({ message: "You are not a member or owner of this list" });
      return;
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid or expired" });
  }
};