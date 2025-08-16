import express from "express"
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv"; 
import UserRoutes from "./routes/user.route.js"
import ContentRoutes from "./routes/content.route.js"
import cookieParser from "cookie-parser";       
dotenv.config(); 
const app = express()

app.use(cookieParser())
app.use(express.json()); // preserve the json 


// define routes 
app.use("/api/v1/user", UserRoutes)
app.use("/api/v1/content", ContentRoutes); 
app.use("/api/v1/auth", authRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`the server is listening on port ${PORT}`);
    connectDB();

})