import BlogCard from "../components/BlogCard";
import Skeleton from "../components/Skeleton";
import AppBar from "../components/AppBar";
import AppBarLogged from "../components/AppBarLogged";
import { useEffect, useState } from "react";
import useBlog, { useTokenExists } from "@/Hooks/Bloghook";

function Blog() {
  const {loading , allBlogs} = useBlog()
  const { userTokenExists } = useTokenExists();

  const [MyBlogs, setMyBlogs] = useState(allBlogs);

  useEffect(() => {
    setMyBlogs(allBlogs);
  }, [allBlogs]);

  // console.log("queriedBlogs", MyBlogs);

  if (loading) {
    return (
      <div>
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
        {MyBlogs.length > 0 ? (
          MyBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              authorName={blog.authorname}
              mainbody={blog.content}
              publishDate={blog.publishDate}
              id={blog.id}
              profilePicture={blog.profilePicture}
            />
          ))
        ) : (
          <div>No blogs found.</div>
        )}
      </div>
    </div>
  );
}

export default Blog