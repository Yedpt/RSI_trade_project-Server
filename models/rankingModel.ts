import { DataTypes, Model } from "sequelize";
import connectionDB from "../database/connectionDB";
import UserModel from "./userModel";
import { rankingEnum } from "../interfaces/rankingInterface";

const rankingModel = connectionDB.define("ranking", {
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
    mount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    ranking_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    state: {    
        type: DataTypes.ENUM(rankingEnum.master, rankingEnum.middle, rankingEnum.junior),
        allowNull: false,
    },  
    total_investments: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
    
});

export default rankingModel;