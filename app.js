import express from "express";
import dotenv from "dotenv";
import pool from "./db/database.js";
import operatorRoutes from "./routes/operatorRoutes.js";
import incidentRoutes from "./routes/incidentRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/operators", operatorRoutes);
app.use("/incidents", incidentRoutes);

app.get("/", (req, res) => {
    res.json({ status: "OK", message: "Iron Dome Ops Server is running" });
});

app.use(errorHandler);

const startServer = async () => {
    try {
        console.log("Connecting to database pool...");
        const connection = await pool.getConnection();
        console.log("Database connection successful!");
        connection.release();

        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Critical: Failed to connect to the database on startup!", error.message);
        console.log("Attempting to start server anyway...");
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT} (Database pending)`);
        });
    }
};

startServer();