import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";
import { UserProps } from "../types/user";
import bcrypt from "bcrypt";

class User extends Model<UserProps> implements UserProps {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public checkPassword!: (password: string) => Promise<boolean>;
}

User.init(
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize, // passing the `sequelize` instance is required
        tableName: "users",
        timestamps: true, // ensures Sequelize manages timestamps
    }
);

User.beforeCreate(async (user: User) => {
    const salt = 10;
    user.password = await bcrypt.hash(user.password, salt);
});

User.beforeUpdate(async (user: User) => {
    if (user.changed("password")) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

User.prototype.checkPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

export default User;