import AppBarLogged from "../components/AppBarLogged";
import { useBlogByTitle } from "@/Hooks/Bloghook";
import BlogByTitle from "@/components/BlogByTitile";
import Skeleton from "@/components/Skeleton";
import { useLocation } from "react-router-dom";

function SearchedBlogs() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query") || "";
  const { searchedBlogs, loading } = useBlogByTitle({ searchQuery });

  if (loading) {
    return (
      <div>
        <div>
          <AppBarLogged />
        </div>
        <div>
          <Skeleton />
        </div>
      </div>
    );
  }

  return (
    <div>
      <AppBarLogged />
      <div>
        {searchedBlogs.length > 0 ? (
          searchedBlogs.map((blog) => (
            <BlogByTitle
              key={blog.id}
              authorName={blog.authorname}
              title={blog.title}
              mainbody={blog.content}
              publishDate={blog.publishDate}
              profilePicture={blog.profilePicture}
              coverPhotoUrl={blog.coverPhoto}
              id={blog.id}
            />
          ))
        ) : (
          <div className="flex  justify-center mt-8">
            <div className="bg-gray-100 p-8 mx-3  rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold font-rowdies text-center mb-4">
                No blogs found
              </h2>
              <p className="text-gray-700 text-center text-lg">
                Sorry, we couldn't find any blogs with the title you searched
                for.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchedBlogs;
