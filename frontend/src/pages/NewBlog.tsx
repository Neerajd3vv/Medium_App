import AppBar from "../components/AppBar";
import CreateBlog from "../components/CreateBlog";
function NewBlog() {
  return (
    <div>
      <AppBar />
      <div className="mx-2  xl:mx-80">
        <div>
          <div className="flex justify-center my-4 font-Poppins font-bold text-3xl" >Create Blog</div>
          <CreateBlog />
        </div>
      </div>
    </div>
  );
}

export default NewBlog;
