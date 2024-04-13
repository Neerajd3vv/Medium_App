import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import NewBlog from "./pages/NewBlog";
import BlogsMine from "./pages/BlogsMine";
import UserLoggedOut from "./pages/UserLoggedOut";
// import AppBarLogged from "./components/AppBarLogged";
// import AppBar from "./components/AppBar";
// import { useTokenExists } from "./Hooks/Bloghook";

function App() {
  // const {userTokenExists} = useTokenExists()
 
  return (
    <>
      <BrowserRouter>
      {/* {userTokenExists ? <AppBarLogged /> : <AppBar />} */}
      
        <Routes>
          <Route path="/" element={<Blogs/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/create-blog" element={<NewBlog />} />
          <Route path="/myblogs" element={<BlogsMine />} />
          <Route path="/logoutDone" element={<UserLoggedOut />} />
        
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
