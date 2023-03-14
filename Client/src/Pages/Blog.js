import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BlogCard from '../Components/BlogCard';

const Blog = () => {
    const [blogs , setBlogs] = useState([]);

    const getAllBlogs = async() => {
        try {
        const {data} = await axios.get("http://localhost:8080/api/v1/blog/all-blogs",)  
        if(data){
            setBlogs(data.blogs)
        }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllBlogs();
    },[])
  return (
   <>
   {
    blogs && blogs.map((blog) => {
        return (
    <BlogCard
    isUser={localStorage.getItem("userId") === blog?.user?._id}
     id={blog?._id}
      key={blog._id} 
      username={blog.user?.username}
       title={blog.title} 
       description={blog.description} 
       image={blog.image}/>
        )
    })
   }
    
   </>
  )
}

export default Blog