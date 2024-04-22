import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import NewBlog from "./pages/NewBlog";
import BlogsMine from "./pages/BlogsMine";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateBlog from "./pages/UpdateBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          toastStyle={{ fontFamily: "Poppins" }}
          position="top-center"
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/create-blog" element={<NewBlog />} />
          <Route path="/updateblog/:id" element={<UpdateBlog />} />
          <Route path="/myblogs" element={<BlogsMine />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
