import BlogCard from "../components/BlogCard";
import Skeleton from "../components/Skeleton";
import useBlog, { useTokenExists } from "../Hooks/Bloghook";
import AppBar from "../components/AppBar";
import AppBarLogged from "../components/AppBarLogged";
import { useEffect, useState } from "react";
// import DummyAppBar from "../components/DummyAppbar";



function Blog() {
  const { loading, allBlogs } = useBlog();
  const { userTokenExists } = useTokenExists();
  
  
 const [MyBlogs , setMyBlogs] = useState(allBlogs)
//  console.log(MyBlogs);
  

useEffect(()=>{
  setMyBlogs(MyBlogs)
},[MyBlogs])

  if (loading) {
    return (
      <div>
        {/* <DummyAppBar/> */}
        {userTokenExists ? <AppBarLogged /> : <AppBar />}
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    );
  }

  return (
    <div>
      {userTokenExists ? <AppBarLogged /> : <AppBar />}
      <div>
        {MyBlogs.length > 0 && MyBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            authorName={blog.authorname}
            mainbody={blog.content}
            publishDate={blog.publishDate} // Assuming you want a static publish date
            id={blog.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Blog;
