import { DataTypes, Model } from "sequelize";
import connectionDB from "../database/connectionDB";
import UserModel from "./userModel";
import rankingModel from "./rankingModel";
import { profitsEnum } from "../interfaces/profitsInterface";

const profitsModel = connectionDB.define("profits", {
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
    ranking_id: {
        type: DataTypes.INTEGER,
        references: {
            model: rankingModel,
            key: 'id',
        },
    },
    profile_type: {
        type: DataTypes.ENUM(profitsEnum.top, profitsEnum.medio, profitsEnum.bajo),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_optained: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,

    },
    
});

export default profitsModel;