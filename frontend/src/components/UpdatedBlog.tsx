import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { toast } from "react-toastify";
import { storage } from "../../Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { UpdateSchema } from "@neerajrandom/medium-cloned";
import { useParams } from "react-router-dom";
// react quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function CreateBlog() {
  const { id } = useParams();
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [userInfo, setUserInfo] = useState<UpdateSchema>({
    title: "",
    body: "",
    coverphoto: "",
  });
  const PublishPost = async () => {
    try {
      if (!userInfo.title || !userInfo.title || !coverPhoto) {
        toast.error("Please fill in all fields and select a cover photo!", {
          autoClose: 1300,
        });
        return;
      }
      const CoverPhotoRef = ref(
        storage,
        `CoverPhoto/${coverPhoto.name + v4()}`
      );
      await uploadBytes(CoverPhotoRef, coverPhoto);
      getDownloadURL(CoverPhotoRef).then(async (url) => {
        // console.log("backend api hit");

        await axios.put(
          `${BACKEND_URL}/api/v1/blog/updateblog/${id}`,
          { title: userInfo.title, body: userInfo.body, coverphoto: url },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        toast("Blog updated successfully!", { autoClose: 1300 });
      });
    } catch (error) {
      toast.error("Error in creating blog", { autoClose: 1300 });
    }
  };

  const maxImageSize = 8 * 1024 * 1024;

  const HandleImages = (event: any) => {
    const file = event.target.files[0];
    if (!file || file.size > maxImageSize) {
      toast("Image size exceeds 8mb");
      return;
    }
    setCoverPhoto(file);
  };
  return (
    <div>
      <input
        onChange={(e) => {
          setUserInfo({
            ...userInfo,
            title: e.target.value,
          });
        }}
        className="bg-slate-100 font-Afacad text-xl focus:ring w-2/4 focus:ring-blue-500 lg:w-2/4  p-3  focus:outline-none  mb-3 rounded-lg"
        placeholder="Blog title!"
      />
      <ReactQuill
        onChange={(value) => {
          setUserInfo({
            ...userInfo,
            body: value,
          });
        }}
        className="h-96 mb-20 lg:mb-12"
        theme="snow"
      />

      <input
        onChange={HandleImages}
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
