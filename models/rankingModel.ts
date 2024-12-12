import { Model, DataTypes, Optional } from "sequelize";
import connectionDB from "../database/connectionDB";
import UserModel from "./userModel";

// Define the enum for ranking states
export enum RankingEnum {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    PENDING = 'pending',
}

// Define the interface for the Ranking attributes
interface IRankingAttributes {
    id: number;
    user_id: number;
    mount: number;
    ranking_date: Date;
    state: RankingEnum;
    total_investments: number;
}

// Define the creation attributes (optional fields during creation)
interface IRankingCreationAttributes extends Optional<IRankingAttributes, "id"> {}

// Extend Sequelize Model with the defined interfaces
class RankingModel extends Model<IRankingAttributes, IRankingCreationAttributes> implements IRankingAttributes {
    public id!: number;
    public user_id!: number;
    public mount!: number;
    public ranking_date!: Date;
    public state!: RankingEnum;
    public total_investments!: number;
}

// Initialize the model
RankingModel.init(
    {
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
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        ranking_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        state: {
            type: DataTypes.ENUM(...Object.values(RankingEnum)),
            allowNull: false,
        },
        total_investments: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize: connectionDB,
        modelName: "ranking",
    }
);

// Define the association with UserModel
RankingModel.belongsTo(UserModel, {
    foreignKey: 'user_id'
});

export default RankingModel;
