import express from "express"
import { loginController, registerController, userController } from "../Controllers/UserControllers.js"

 const route = express.Router()

route.get("/all-user" , userController)
route.post("/register" , registerController)
route.post("/login" , loginController)

export default route;

