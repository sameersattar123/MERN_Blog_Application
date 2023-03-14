import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        title: {
          type: Array,
          require: [true, "title is required"],
        },
        description: {
          type: Array,
          required: [true, "description is require"],
        },
        image: {
          type: Array,
          required: [true, "image is require"], 
        },
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
          require: [true, "user id is required"],
        },
      },
      { timestamps: true }
    
)

const BlogModel = mongoose.model("Blog" , BlogSchema)

export default  BlogModel;