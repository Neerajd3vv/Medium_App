import AppBar from "./AppBar";
import { Avatar } from "./BlogCard";

interface BlogtypeId {
  id: string;
  title: string;
  body: string;
  authorname: string;
}

function ParticularBlog({ blogById }: { blogById: BlogtypeId | undefined }) {
  console.log(blogById);

  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-1  lg:grid-cols-12 lg:max-w-screen-xl px-12 pt-20">
          {/* Left Part */}
          <div className=" col-span-12 lg:col-span-8">
            <div className="text-4xl lg:text-5xl font-extrabold pb-2 font-Poppins">
              {blogById?.title}
            </div>
            <div className="font-bold text-md text-slate-500 font-poppins">
              Posted on 3 April, 2024
            </div>
            <div className="font-hind  w-full max-w-4xl pt-4 text-md lg:text-xl leading-normal tracking-wide">
              {blogById?.body}
            </div>
          </div>
          {/* Right Part */}
          <div className="col-span-12  lg:col-span-4 lg:pl-16  mt-16 lg:mt-0">
            <div className="font-semibold text-md text-slate-700 pb-2 font-poppins">
              Author
            </div>
            <div className="flex">
              <div className="flex items-center pr-4">
                <Avatar authorName={blogById?.authorname} />
              </div>
              <div>
                <div className="text-2xl font-Poppins">
                  {blogById?.authorname}
                </div>
                <div className="font-roboto">
                  Master of mirth, purveyor of puns, and the funniest person in
                  the kingdom
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticularBlog;
