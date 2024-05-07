import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();
const app = express();
app.use(cors());


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB.")
    } catch (error) {
        console.log(error)
    }
}

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);


app.use((err,req, res, next) => {
    const errorStatus = err.status || 500; 
    const errorMessage = err.message || "Something went wrong"; 
    return res.status(errorStatus).json({
        success: false, 
        status: errorStatus, 
        message: errorMessage, 
        stack: err.stack,
    })
})


app.listen(8800, () => {
    connect(); 
    console.log("Server running on port 8800.")
});

