import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";
import { TaskProps } from "../types/task";

class Task extends Model<TaskProps> implements TaskProps {
    public id!: number;
    public title!: string;
    public description?: string;
    public priority!: "low" | "medium" | "high";
    public isCompleted!: boolean;
    public dueDate?: Date;
    public listId!: number;
    public completedById!: number;
    public assignedToId?: number;
}

Task.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        priority: {
            type: DataTypes.ENUM("low", "medium", "high"),
            allowNull: false,
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        listId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        completedById: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        assignedToId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize, // passing the `sequelize` instance is required
        tableName: "tasks",
        timestamps: true, // ensures Sequelize manages timestamps
    }
);

export default Task;