import AppBarLogged from "@/components/AppBarLogged";
import CreateBlog from "../components/CreateBlog";
function NewBlog() {
  return (
    <div>
      <AppBarLogged/>
      <div className="mx-2  xl:mx-80">
        <div>
          <div className="flex justify-center my-6 font-ptserif font-bold text-4xl text-MainBlack" >Create Your Blog Post</div>
          <CreateBlog />
        </div>
      </div>
    </div>
  );
}

export default NewBlog;
