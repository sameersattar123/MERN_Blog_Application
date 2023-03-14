import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        { username: input.name, email: input.email, password: input.password }
      );
      if (data) {
        alert("register successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        maxWidth={450}
        alignItems={"center"}
        justifyContent={"center"}
        borderRadius={7}
        padding={3}
        margin={"auto"}
        marginTop={10}
        boxShadow="10px 10px 20px #aaa"
      >
        <Typography
          variant="h4"
          sx={{ textTransform: "uppercase" }}
          padding={3}
          textAlign="center"
        >
          Register
        </Typography>
        <TextField
          placeholder="Enter your Name"
          type="text"
          name="name"
          margin="normal"
          required
          value={input.name}
          onChange={handleChange}
        />
        <TextField
          placeholder="Enter your Email"
          type="email"
          name="email"
          margin="normal"
          required
          value={input.email}
          onChange={handleChange}
        />
        <TextField
          placeholder="Enter your Pasword"
          type="password"
          name="password"
          margin="normal"
          required
          value={input.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          sx={{ borderRadius: 3, marginTop: 3 }}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
        <Button
          sx={{ borderRadius: 3, marginTop: 3 }}
          onClick={() => navigate("/login")}
        >
          Already Registered ? Please Login
        </Button>
      </Box>
    </form>
  );
};

export default Register;
