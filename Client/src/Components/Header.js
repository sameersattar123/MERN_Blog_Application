import React from 'react'
import { Box , Typography , AppBar, Toolbar , Button } from "@mui/material"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../Redux/Store'

const Header = () => {
    let islogin = useSelector(state => state.isLogin)
    islogin ||= localStorage.getItem("userId")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = () => {
        dispatch(authActions.login())
        navigate("/login")
    }
  return (
  <>
    <AppBar position="sticky">
        <Toolbar>
                <Typography variant="h4">
                    My Blog App
                </Typography>
                {
                    islogin && <>
                    <Box display={"flex"} marginLeft="auto">
                    <Button sx={{ margin : 1 , color:"white" }} LinkComponent={Link} to="/blogs" >Blogs</Button>
                    <Button sx={{ margin : 1 , color:"white" }} LinkComponent={Link} to="/my-blogs">My Blogs</Button>
                    <Button sx={{ margin : 1 , color:"white" }} LinkComponent={Link} to="/create-blogs">Creates Blogs</Button>
                </Box>
                    </>
                }
                <Box display={"flex"} marginLeft="auto">
                   {
                    !islogin && <>
                    <Button sx={{ margin : 1 , color:"white" }} LinkComponent={Link} to="/login" >Login</Button>
                    <Button sx={{ margin : 1 , color:"white" }} LinkComponent={Link} to="/register">Register</Button>
                    </> 
                   }
                    {
                        islogin && <>
                    <Button sx={{ margin : 1 , color:"white" }}
                    onClick={() => handleLogin()}
                    >Logout</Button>
                        </>
                    }
                </Box>
        </Toolbar>
    </AppBar>
  </>
  )
}

export default Header