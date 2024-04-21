import { Avatar } from "./BlogCard";
interface BlogtypeId {
  id: string;
  title: string;
  content: string;
  authorname: string;
  publishDate: string;
  profileImage:string | null
  authorBio: string;
  coverphoto: string
}

function ParticularBlog({ blogById }: { blogById: BlogtypeId | undefined }) {
  console.log(blogById);
  return (
    <div>
      <div className="flex justify-center mb-20">
        <div className="grid grid-cols-1  lg:grid-cols-12 lg:max-w-screen-2xl px-3 lg:px-12 pt-20">
          {/* Left Part */}
          <div className=" col-span-12 lg:col-span-8">
            <div className="text-4xl lg:text-5xl font-extrabold pb-2 font-Poppins">
              {blogById?.title}
            </div>
            <div className="font-bold text-md text-slate-500 font-poppins">
              {blogById?.publishDate}
            </div>
            <div>
              <img className="mt-4 mb-8" src={blogById?.coverphoto} alt="Cover_Image" />
            </div>
            <div className="font-Gelasio text-meblack  w-full max-w-4xl pt-4 text-xl lg:text-xl leading-relaxed tracking-wider">
              {blogById?.content}
            </div>
          </div>
          {/* Right Part */}
          <div className="col-span-12 pb-12 lg:col-span-4 lg:pl-16  mt-16 lg:mt-0">
            <div className="font-semibold text-md text-slate-700 pb-2 font-poppins">
              Author
            </div>
            <div className="flex">
              <div className="flex   items-center pr-4">
                {blogById?.profileImage ? (
                  <AvatarProfile userImage={blogById?.profileImage}/>
                ): (
                  <Avatar authorName={blogById?.authorname}/>
                )}
              </div>
              <div>
                <div className="text-2xl font-Gelasio  font-semibold">
                  {blogById?.authorname}
                </div>
                <div className="font-Afacad text-xl">{blogById?.authorBio}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default ParticularBlog;


function AvatarProfile({ userImage }: { userImage: string  }) {
  return (
    <div className="bg-slate-200 flex justify-center items-center h-20 w-20 rounded-full">
   <img className="rounded-full h-20 w-20" src={userImage} alt="Image"/>
    </div>
  );
}
