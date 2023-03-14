import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateBlogs = () => {
    const id = localStorage.getItem("userId");
    const navigate = useNavigate()

    const [input , setInput] = useState({
        title : " ",
        description :  "",
        image : ""
    })

    const handleSubmit = async(e) =>{
        e.preventDefault()
        console.log(input)
        try {
            const {data} = await axios.post("http://localhost:8080/api/v1/blog/create-blogs" , {
                title : input.title,
                description : input.description,
                image : input.image,
                user : id
            })
            if(data){
                alert("blog created successfully")
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
            <Button type="submit" color="primary" variant="contained">Submit</Button>
            </Box>
        </form>
    </>
  )
}

export default CreateBlogs