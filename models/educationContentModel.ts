import { DataTypes, Model } from "sequelize";
import connectionDB from "../database/connectionDB";
import UserModel from "./userModel";
import { educationContentEnum } from "../interfaces/educationContentInterface";

const educationContentModel = connectionDB.define("education_Content", {
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
    type: {
        type: DataTypes.ENUM(educationContentEnum.video, educationContentEnum.texto, educationContentEnum.quiz),
        allowNull: false,
    },
    
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publication_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
    
});

export default educationContentModel;