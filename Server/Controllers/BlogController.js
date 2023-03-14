import BlogModel from "../Models/BlogModel.js";
import {UseerModel}  from "../Models/UserModel.js";
import mongoose from "mongoose";

export const getAllBlogController = async (req, res) => {
  try {
    const blogs = await BlogModel.find({}).populate("user")
    if (!blogs) {
      return res.status(400).send({
        message: "no blog found",
      });
    }
    return res.status(200).send({
      CountBlog: blogs.length,
      message: "All Blogs Founds",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error",
      error,
    });
  }
};
export const createBlogController = async (req, res) => {
  try {
    const { title, description, image , user} = req.body;
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        message: "Please provide  description image sand title", 
      });
    }

    const existingUser = await UseerModel.findById(user)
    if(!existingUser){
        return res.status(404).send({
            message :"unable to found user"
            })
    }
    const newBlog = new BlogModel({ title, description, image , user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(200).send({
      message: "blog created",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error",
      error,
    });
  }
};
export const updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await BlogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      message: "blog updated",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error",
    }),
      error;
  }
};
export const getBlogbyidController = async (req, res) => {
try {
    const {id} = req.params
    const blog = await BlogModel.findById({"_id" : id})
    if(!blog){ 
        return res.status(404).send({
            message : "blog not found"
        })
    }
    return res.status(200).send({
        message : "fetch single blog",
        blog
    })
    
} catch (error) {
    console.log(error)
    res.status(500).status({
        message : "error"
    }),
    error
}
};
export const deleteBlogbyidController = async(req,res) => {
    try {
        const { id } = req.params;
        const blog = await BlogModel.findByIdAndDelete(id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save();
        return res.status(200).send({
          message: "blog deleted",
          blog,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "error",
        }),
          error;
      }
};

export const userBlogController = async(req , res) => {

    try {
        const userBlog = await UseerModel.findById(req.params.id).populate("blogs");
    if (!userBlog) {
        return res.status(404).send({
        success: false,
        message: "blogs not found with this id",
      });
    }
    return res.status(200).send({
        success: true,
      message: "user blogs",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in user blog",
      error,
    });
  }
}
