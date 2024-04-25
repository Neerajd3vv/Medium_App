import { usePersonalBlogs, useTokenExists } from "../Hooks/Bloghook";
import AppBar from "../components/AppBar";
import MyBlogs from "../components/MyBlogs";
import Skeleton from "../components/Skeleton";
import AppBarLogged from "../components/AppBarLogged";
// import DummyAppBar from "../components/DummyAppbar";
function BlogsMine() {
  const { userTokenExists } = useTokenExists();
  const { loading, myPersonalblog } = usePersonalBlogs();
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
        {myPersonalblog.map((blog) => (
          <MyBlogs
          key={blog.id}
           profilePicture={blog.profilePicture}
            id={blog.id}
            body={blog.body}
            title={blog.title}
            authorName={blog.authorname}
            publishDate={blog.publishDate}
            coverphoto={blog.coverphoto}
          />
        ))}
      </div>
    </div>
  );
}

export default BlogsMine;
