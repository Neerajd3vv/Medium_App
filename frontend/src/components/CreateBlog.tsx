import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { toast } from "react-toastify";
function CreateBlog() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const PublishPost = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog/createblog`,
        { title, body },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const userBlog = response.data.Blog;
      if (userBlog) {
        setTitle("")
        setBody("")
        toast("Blog created successfully!" , {autoClose: 1200})
      }
    } catch (error) {
      toast.error("Error creating blog" )
    }
  };

  return (
    <div>
     <input
      value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        className="bg-slate-100 font-Afacad text-xl focus:ring w-2/4 focus:ring-blue-500 lg:w-2/4  p-3  focus:outline-none  mb-3 rounded-lg"
        placeholder="Blog title!"
      />
     
      
        <textarea
          onChange={(e) => {
            setBody(e.target.value);
          }}
         value={body}
          id="editor"
          rows={14}
          className="w-full font-Afacad text-2xl px-3 shadow-xl rounded-lg py-3  border-2 border-gray-200 focus:outline-none  "
          placeholder="Write your blog post..."
          required
        ></textarea>
         <input
      className="bg-green-500  font-Afacad my-3 p-3 text-white   rounded-lg"
      type="file"
      accept="images/*"
      placeholder="Choose Image"
      />
        <button
          onClick={PublishPost}
          className="w-full py-3 font-Afacad text-lg text-white bg-heheblu hover:bg-Myblue rounded-b-lg focus:outline-none "
        >
          Publish Post
        </button>
      
    </div>
  );
}

export default CreateBlog;
