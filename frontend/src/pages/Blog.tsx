//atomfamilies/ selectorfamilies
import { useBlogbyId, useTokenExists} from "../Hooks/Bloghook";
import ParticularBlog from "../components/ParticularBlog";
import { useParams } from "react-router-dom";
import { ParticularBlogSkeleton } from "../components/Skeleton";
import AppBar from "../components/AppBar";
import AppBarLogged from "../components/AppBarLogged";
// import DummyAppBar from "../components/DummyAppbar";

function Blog() {
  const {userTokenExists}   = useTokenExists();
  const { id } = useParams();
  const { loading, blogById } = useBlogbyId({
    id: id || "",
  });
  if (loading) {
    return (
      <div>
        {/* <DummyAppBar/> */}
        {userTokenExists ? <AppBarLogged /> : <AppBar />}
        <ParticularBlogSkeleton />
      </div>
    );
  }
  return (
    <div>
      {userTokenExists ? <AppBarLogged /> : <AppBar />}
      <ParticularBlog blogById={blogById} />
    </div>
  );
}

export default Blog;
