import { DataTypes, Model } from "sequelize";
import connectionDB from "../database/connectionDB";
import UserModel from "./userModel";
import { investmentsEnum, stateEnum } from "../interfaces/investmentsInterface";

const investmentsModel = connectionDB.define("investments", {
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
    investment_type: {
        type: DataTypes.ENUM(investmentsEnum.acciones, investmentsEnum.bonos, investmentsEnum.fondos),
        allowNull: false,
    },
    mount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    state: {
        type: DataTypes.ENUM(stateEnum.cerrado, stateEnum.abierto),
        allowNull: false,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
    
});

export default investmentsModel;