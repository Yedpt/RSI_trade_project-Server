import { Sequelize } from "sequelize";
import connectionDB from "./database/connectionDB";
import UserModel from "./models/userModel";
import userAchievements from "./models/userAchievementsModel";
import rankingModel from "./models/rankingModel";
import profitsModel from "./models/profitsModel";
import investmentsModel from "./models/investmentsModel";
import investmentsProductssModel from "./models/investmentsProducts";
import educationContentModel from "./models/educationContentModel";
import activityHistoryModel from "./models/activityHistoryModel";
import Achievements from "./models/achievementsModel";
import commentsModel from "./models/commentsModel";
import chatbotRoutes from "./routes/chatbotRoutes";
import stockRouter from "./routes/stockRouter";
import { PORT } from "./config";
import express from "express";
import cors from "cors";


export const app = express();

app.use (cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//rutas
app.use("/api", chatbotRoutes)
app.use("/api/stocks", stockRouter)

const initDB = async (sequelize: Sequelize) => {
    try {
        await sequelize.authenticate();
        console.log("Conexión exitosa a la base de datos.");
        
        await UserModel.sync({ force: false });
        console.log("Tabla de usuarios sincronizada.");
        
        await Achievements.sync({ force: false });
        console.log("Tabla de Achievements sincronizada.");

        await userAchievements.sync({ force: false });
        console.log("Tabla de userAchievements sincronizada.");

        await rankingModel.sync({ force: false });
        console.log("Tabla de ranking sincronizada.");

        await profitsModel.sync({ force: false });
        console.log("Tabla de profits sincronizada.");

        await investmentsModel.sync({ force: false });
        console.log("Tabla de investments sincronizada.");

        await investmentsProductssModel.sync({ force: false });
        console.log("Tabla de investmentsProducts sincronizada.");

        await educationContentModel.sync({ force: false });
        console.log("Tabla de educationContent sincronizada.");

        await activityHistoryModel.sync({ force: false });
        console.log("Tabla de activityHistory sincronizada.");

        await commentsModel.sync({force: false});
        console.log("Tabla de comments sincronizada");

     
    } catch (error) {
        console.error("Error al conectar la base de datos:", error);
    }
};

initDB(connectionDB);


// Iniciar servidor
export const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});