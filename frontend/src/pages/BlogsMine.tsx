import { usePersonalBlogs } from "../Hooks/Bloghook";
import AppBar from "../components/AppBar";
import MyBlogs from "../components/MyBlogs";
import Skeleton from "../components/Skeleton";

function BlogsMine() {
  const { loading, myPersonalblog } = usePersonalBlogs();
  if (loading) {
    return (
      <div>
        <AppBar />
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
      <AppBar />
      <div>
        {myPersonalblog.map((blog) => (
          <MyBlogs
            id={blog.id}
            body={blog.body}
            title={blog.title}
            authorName={blog.authorname}
            publishDate={blog.publishDate}
          />
        ))}
      </div>
    </div>
  );
}

export default BlogsMine;
