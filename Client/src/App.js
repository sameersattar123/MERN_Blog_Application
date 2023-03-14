import './App.css';
import { BrowserRouter , Routes , Route } from "react-router-dom"
import Login from './Pages/Login';
import Register from './Pages/Register';
import Blog from './Pages/Blog';
import Header from './Components/Header';
import UserBlogs from './Pages/UserBlogs';
import CreateBlogs from './Pages/CreateBlogs';
import BlogDetails from './Pages/BlogDetails';


function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Blog/>}/>
        <Route path="/blogs" element={<Blog/>}/>
        <Route path="/my-blogs" element={<UserBlogs/>}/>
        <Route path="/blog-details/:id" element={<BlogDetails/>}/>
        <Route path="/create-blogs" element={<CreateBlogs/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
