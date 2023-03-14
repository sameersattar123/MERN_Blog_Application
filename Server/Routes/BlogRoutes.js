import express from "express";
import {
  createBlogController,
  deleteBlogbyidController,
  getAllBlogController,
  getBlogbyidController,
  updateBlogController,
  userBlogController,
} from "../Controllers/BlogController.js";
const route = express.Router();

route.get("/all-blogs", getAllBlogController);
route.post("/create-blogs", createBlogController);
route.put("/update-blogs/:id", updateBlogController);
route.get("/get-blogs/:id", getBlogbyidController);
route.delete("/delete-blogs/:id", deleteBlogbyidController);  
route.get("/user-blogs/:id", userBlogController);

export default route;
