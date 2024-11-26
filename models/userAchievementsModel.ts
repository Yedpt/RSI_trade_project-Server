import { DataTypes, Model } from "sequelize";
import connectionDB from "../database/connectionDB";
import UserModel from "./userModel";
import Achievements from "./achievementsModel";

const userAchievements = connectionDB.define("user_achievements", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: UserModel,
            key: 'id',
        },
    },
    id_achievement: {
        type: DataTypes.INTEGER,
        references: {
            model: Achievements,
            key: 'id',
        },
        allowNull: false,
    },
    achieved_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

export default userAchievements;