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
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profile: {
        type: DataTypes.ENUM(profileEnum.impulsivo, profileEnum.medio, profileEnum.reservado),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,   
        defaultValue: DataTypes.NOW,
        },
        hasCompletedMiFID: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        },
});

export  default UserModel;