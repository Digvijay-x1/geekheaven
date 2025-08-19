import express from "express"
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv"; 
import UserRoutes from "./routes/user.route.js"
import ContentRoutes from "./routes/content.route.js"
import cookieParser from "cookie-parser";      
import cors from "cors"; 
import path from "path"; 

dotenv.config(); 
const app = express()

// Middleware
app.use(cookieParser())
app.use(express.json())
const __dirname = path.resolve();

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === "production" 
        ? process.env.FRONTEND_URL 
        : "http://localhost:5173",
    credentials: true
}))


// API Routes
app.use("/api/v1/user", UserRoutes)
app.use("/api/v1/content", ContentRoutes)
app.use("/api/v1/auth", authRoutes)

// Production setup
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Something went wrong!"
    })
})


const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();