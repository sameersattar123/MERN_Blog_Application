import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../Components/BlogCard";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/blog/user-blogs/${id}`
      );
      if (data) {
        setBlogs(data.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs);
  return (
    <>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
           id={blog._id} 
           isUser={true}
            // key={blog._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
          />
        ))
      ) : (
        <h1 style={{ display : "flex" , justifyContent : "center" , alignItems : "center" , color: "red" , marginTop : "20rem" , fontSize : "3rem" }} >You haven't Created a Blog</h1>
      )}
    </>
  );
};

export default UserBlogs;
