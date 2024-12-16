import { DataTypes, Model } from "sequelize";
import connectionDB from "../database/connectionDB";
import { profileEnum, Users } from "../interfaces/userInterface";

interface UserModel extends Model<Users>, Users {}
const UserModel = connectionDB.define<UserModel>("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    hasCompletedMiFID: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    earnings: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    wallet: {
        type: DataTypes.FLOAT,
        defaultValue: 100000,
        allowNull: true,
      },
});

export default UserModel;
