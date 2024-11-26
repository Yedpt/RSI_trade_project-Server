import { DataTypes, Model } from "sequelize";
import connectionDB from "../database/connectionDB";
import UserModel from "./userModel";
import { activity_histyoryEnum } from "../interfaces/activityHistoryInterface";

const activityHistoryModel = connectionDB.define("activity_history", {
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
    activity_type: {
        type: DataTypes.ENUM(activity_histyoryEnum.master, activity_histyoryEnum.middle, activity_histyoryEnum.junior), 
        allowNull: false,
    },
    
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    activity_date : {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
    
});

export default activityHistoryModel;