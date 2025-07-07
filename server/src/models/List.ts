import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";
import { ListProps } from "../types/list";

class List extends Model<ListProps> implements ListProps {
    public id!: number;
    public name!: string;
    public userId!: number;
}

List.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize, // passing the `sequelize` instance is required
        tableName: "lists",
        timestamps: true, // ensures Sequelize manages timestamps
    }
);

export default List;