import AppBarLogged from "../components/AppBarLogged";
import { useBlogByTitle } from "@/Hooks/Bloghook";
import BlogByTitle from "@/components/BlogByTitile";
import { useLocation } from "react-router-dom";

function SearchedBlogs() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query") || "";
  const { searchedBlogs } = useBlogByTitle({ searchQuery });

  return (
    <div>
      <AppBarLogged />
      <div>
        {searchedBlogs.map((blog) => (
          <BlogByTitle
            authorName={blog.authorname}
            title={blog.title}
            mainbody={blog.content}
            publishDate={blog.publishDate}
            profilePicture={blog.profilePicture}
            coverPhotoUrl={blog.coverPhoto}
            id={blog.id}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchedBlogs;
