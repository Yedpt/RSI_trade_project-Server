import { DataTypes, Model } from "sequelize";
import connectionDB from "../database/connectionDB";
import { AchievementsEnum } from "../interfaces/achievementsInterface";
import UserModel from "./userModel";

const Achievements = connectionDB.define("Achievements", {
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
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    investments_count: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    rewards : {
        type: DataTypes.ENUM(AchievementsEnum.acciones, AchievementsEnum.regalo),
        allowNull: false,
    }
});

export default Achievements;