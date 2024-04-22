import AppBarLogged from "@/components/AppBarLogged";
import UpdatedBlog from "@/components/UpdatedBlog";

function UpdateBlog() {
  return (
    <div>
      <AppBarLogged />
      <div className="mx-2  xl:mx-80">
        <div>
          <div className="flex justify-center my-6 font-ptserif font-bold text-4xl text-MainBlack">
            Update your Blog!
          </div>
          <UpdatedBlog />
        </div>
      </div>
    </div>
  );
}

export default UpdateBlog;
