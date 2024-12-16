import { DataTypes, Model } from "sequelize";
import connectionDB from "../database/connectionDB";
import UserModel from "./userModel";
import { Investments} from "../interfaces/investmentsInterface";


interface investments extends Model<Investments>, Investments {}
const investmentsModel = connectionDB.define<investments>("investments", {
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
    stockName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      action: {
        type: DataTypes.ENUM("buy", "sell"),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    
    
});

export default investmentsModel;