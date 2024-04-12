function Skeleton() {
  return (
    <div className="flex  justify-center ">
      <div className="py-12 px-8 border-b-2 cursor-pointer animate-pulse border-slate-300 w-screen max-w-3xl  rounded-md ">
        <div className="flex col items-center mb-4">
          <div>
            <div>
              <div className=" w-8 h-8  bg-slate-300 rounded-full "></div>
            </div>
          </div>
          <div className="w-16 h-6 mx-2 bg-slate-200 rounded-2xl"></div>

          <div className="bg-slate-200 w-1/4 h-6 rounded-2xl font-Afacad"></div>
        </div>
        <div className="w-4/5 h-6 bg-slate-300 rounded-2xl mb-3"></div>
        <div className="w-2/5 h-6 bg-slate-300 rounded-2xl"></div>
        <div className="w-4/2 bg-slate-200 h-5 mt-6 rounded-2xl"></div>
        <div className="w-1/2 bg"></div>
      </div>
    </div>
  );
}

export function ParticularBlogSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2  lg:ml-40">
      {/* left-side */}
      <div className="animate-pulse">
        <div className="flex justify-center  px-12 pt-20 ">
          <div className=" w-screen max-w-screen-md lg:max-w-screen-lg">
            <div className="w-3/4 h-12 bg-slate-300 rounded-lg mb-3"></div>
            <div className="w-2/12 h-6 bg-slate-200 rounded-xl mb-5"></div>
            <div className="w-3/2 h-5 bg-slate-200 rounded-2xl mb-3"></div>
            <div className="w-3/4 h-5 bg-slate-200 rounded-2xl mb-3"></div>
            <div className="w-3/2 h-5 bg-slate-200 rounded-2xl mb-3"></div>
          </div>
        </div>
      </div>
      {/* right-side */}
      <div className=" mx-12 lg:mx-40  pt-20 max-w-screen-md lg:w-full  animate-pulse ">
        <div>
          <div className="flex items-center mb-5">
            <div className="h-8 w-8 rounded-full mr-4 bg-gray-300"> </div>
            <div className="w-1/6 h-6 bg-slate-200 rounded-lg"></div>
          </div>
          <div className="w-3/6 h-4 bg-slate-200 mb-3 rounded-xl"></div>
          <div className="w-2/6 h-4 bg-slate-200 mb-3 rounded-xl"></div>
          <div className="w-1/6 h-4 bg-slate-200 mb-3 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

export default Skeleton;

