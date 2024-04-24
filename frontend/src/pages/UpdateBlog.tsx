import AppBarLogged from "@/components/AppBarLogged";
import UpdatedBlog from "@/components/UpdatedBlog";

function UpdateBlog() {
  return (
    <div>
      <AppBarLogged />
      <div className="mx-2  xl:mx-80">
        <div>
          <div className="flex justify-center my-6 font-rowdies font-semibold text-4xl text-slate-800">
            Update your Blog!
          </div>
          <UpdatedBlog />
        </div>
      </div>
    </div>
  );
}

export default UpdateBlog;
