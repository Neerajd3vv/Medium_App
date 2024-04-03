
import BlogCard from "../components/BlogCard";
import useBlog from "../Hooks/Bloghook";
import AppBar from "../components/AppBar";

function Blog() {
  const {loading, allBlogs} = useBlog()

  if (loading) {
    return <div>
      Loading....
    </div>

  }
  
  return (
    <div>
      <AppBar/>
    
    <div>
       {allBlogs.map(blogs => 
       <BlogCard
        title={blogs.title}
        authorName={blogs.authorname}
        mainbody={blogs.content}
        publishDate="not available"
       />
        )}
    </div>
    </div>
  );
}

export default Blog;
