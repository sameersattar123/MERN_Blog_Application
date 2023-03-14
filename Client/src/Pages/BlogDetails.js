import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const BlogDetails = () => {
  const navigate = useNavigate();
  const [input , setInput] = useState({
    title : " ",
    description :  "",
    image : ""
})

const handleSubmit = async(e) =>{
    e.preventDefault()
    console.log(input)
    try {
        const {data} = await axios.put(`http://localhost:8080/api/v1/blog/update-blogs/${id}` , {
            title : input.title,
            description : input.description,
            image : input.image,
            user : id
        })
        if(data){
            alert("blog updated successfully")
            navigate("/my-blogs")
        }else {
            alert("error")
        }
    } catch (error) {
        console.log(error)
    }
}
const handleChange = (e) =>{
    setInput((preState)=> ({
        ...preState , [e.target.name] : [e.target.value]
    }))
}
    const [blog , setBlog] = useState({})

    const id = useParams().id

    const getBlogDetails = async() => {
        try {
            const {data} = await axios.get(`http://localhost:8080/api/v1/blog/get-blogs/${id}`)
            if(data){
              setBlog(data?.blog)
              setInput({
                title : data?.blog.title,
                description : data?.blog.description,
                image : data?.blog.image,
              })
            }
        } catch (error) {
                console.log(error)
        }   
    }

    useEffect(() => {
      getBlogDetails()
    } , [id])
  return (
    <>
       <form onSubmit={handleSubmit}>
            <Box   width={"50%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px">
          <Typography  variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="gray">
                Create a Pots
            </Typography>
            <InputLabel   sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>Title</InputLabel>
            <TextField  name="title"
            value={input.title}
            type="text"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required/>
            <InputLabel   sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>Description</InputLabel>
            <TextField  name="description"
            type="text"
            value={input.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required/>
            <InputLabel   sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>Image</InputLabel>
            <TextField  name="image"
            type="text"
            value={input.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required/>
            <Button type="submit" color="warning" variant="contained">Update Blog</Button>
            </Box>
        </form>
    </>
  )
}

export default BlogDetails