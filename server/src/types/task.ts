export interface TaskProps {
    id?: number;
    title: string;
    description?: string;
    priority: "low" | "medium" | "high";
    isCompleted: boolean;
    dueDate?: Date;
    listId: number;
    completedById: number;
    assignedToId?: number;
};