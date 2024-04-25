import { usePersonalBlogs, useTokenExists } from "../Hooks/Bloghook";
import AppBar from "../components/AppBar";
import MyBlogs from "../components/MyBlogs";
import Skeleton from "../components/Skeleton";
import AppBarLogged from "../components/AppBarLogged";
import { useNavigate } from "react-router-dom";
// import DummyAppBar from "../components/DummyAppbar";
function BlogsMine() {
  const navigate = useNavigate();
  const navigateToCreate = () => {
    navigate("/create-blog");
  };

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
        {myPersonalblog.length > 0 ? (
          myPersonalblog.map((blog) => (
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
          ))
        ) : (
          <div className="flex justify-center mt-8">
            <div className="bg-gray-100 p-8 mx-3 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold font-rowdies text-center mb-4">
                You don't have any blogs yet
              </h2>
              <p className="text-gray-700 text-center text-lg">
                Start sharing your thoughts and experiences by creating your
                first blog.
              </p>
              <div className="flex justify-center mt-6">
                <button
                  onClick={navigateToCreate}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none"
                >
                  Create Blog
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogsMine;
