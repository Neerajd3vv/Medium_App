import BlogCard from "../components/BlogCard";
import Skeleton from "../components/Skeleton";
import AppBar from "../components/AppBar";
import AppBarLogged from "../components/AppBarLogged";
import useBlog, { useTokenExists } from "@/Hooks/Bloghook";

function Blog() {
  const { loading, allBlogs } = useBlog();
  const { userTokenExists } = useTokenExists();

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
        {allBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            authorName={blog.authorname}
            mainbody={blog.content}
            publishDate={blog.publishDate}
            id={blog.id}
            profilePicture={blog.profilePicture}
            coverPhotoUrl={blog.coverphoto}
          />
        ))}
      </div>
    </div>
  );
}

export default Blog;
