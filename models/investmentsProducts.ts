import { DataTypes, Model } from "sequelize";
import connectionDB from "../database/connectionDB";
import investmentsModel from "./investmentsModel";
import { investmentsProductsEnum } from "../interfaces/investmentsProductsInterface";

const investmentsProductssModel = connectionDB.define("investments_products", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    investments_id: {
        type: DataTypes.INTEGER,
        references: {
            model: investmentsModel,
            key: 'id',
        },
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    risk : {
        type: DataTypes.ENUM(investmentsProductsEnum.bajo, investmentsProductsEnum.medio, investmentsProductsEnum.alto),
        allowNull: false,
    },
    expect_profit: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    available_date : {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,

    }
    
});

export default investmentsProductssModel;