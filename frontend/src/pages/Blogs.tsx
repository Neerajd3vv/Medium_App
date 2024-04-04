
import BlogCard  from "../components/BlogCard";
import Skeleton from "../components/Skeleton";
import useBlog from "../Hooks/Bloghook";
import AppBar from "../components/AppBar";

function Blog() {
  const { loading, allBlogs } = useBlog();

   if (loading) {
    return (
      <div>
        <AppBar />
        <div>
         <Skeleton/>
         <Skeleton/>
         <Skeleton/>
         <Skeleton/>
         <Skeleton/>
        </div>
      </div>
    );
         } 

  return (
    <div>
      <AppBar />
      <div>
        {allBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            authorName={blog.authorname}
            mainbody={blog.content}
            publishDate="4th March, 2024" // Assuming you want a static publish date
            id={blog.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Blog;
