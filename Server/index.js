import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import colors from "colors"
import morgan from "morgan"
import { connectDB } from "./Database/db.js"
import UserRoutes from "./Routes/UserRoutes.js"
import Blogroutes from "./Routes/BlogRoutes.js"

dotenv.config()
connectDB()


const app = express()

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/user" , UserRoutes)
app.use("/api/v1/blog" , Blogroutes)  
 
const PORT = process.env.PORT || 8080

app.listen(PORT , ()=>{
    console.log("server connected successfully" , PORT.bgCyan)
})