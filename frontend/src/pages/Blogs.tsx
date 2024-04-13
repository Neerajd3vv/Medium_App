import BlogCard from "../components/BlogCard";
import Skeleton from "../components/Skeleton";
import useBlog, { useTokenExists } from "../Hooks/Bloghook";
import AppBar from "../components/AppBar";
import AppBarLogged from "../components/AppBarLogged";
// import DummyAppBar from "../components/DummyAppbar";

function Blog() {
  const { loading, allBlogs } = useBlog();
  const { userTokenExists } = useTokenExists();

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
        {allBlogs.map((blog) => (
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
