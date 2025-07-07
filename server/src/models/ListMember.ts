import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";
import { ListMemberProps } from "../types/listMember";

class ListMember extends Model<ListMemberProps> implements ListMemberProps {
    public id!: number;
    public listId!: number;
    public userId!: number;
    public role!: "owner" | "member"; // Define roles for list members
}

ListMember.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        listId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("owner", "member"),
            allowNull: false,
            defaultValue: "member", // Default role is member
        },
    },
    {
        sequelize, // passing the `sequelize` instance is required
        tableName: "list_members",
        timestamps: true, // ensures Sequelize manages timestamps
    }
);

export default ListMember;