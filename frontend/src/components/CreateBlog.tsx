import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import Button from "./Button";
import Inputbox from "./Inputbox";
import axios from "axios";
import { BACKEND_URL } from "../config";

function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>();
  const [blogBody, setBlogBody] = useState<string>();
  const editorRef = useRef<any>(null);

  function handleEditorChange(content: string) {
    setBlogBody(content);
    // console.log(blogBody);
  }

  async function AddBlog() {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog/createblog`,
      {
        title,
        body:blogBody,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response) {
        return; 
    }
    navigate("/blogs")
  }
  return (
    <>
      <Inputbox
        label="Title"
        placeholder="my first blog!"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <Editor
        apiKey="3imvf494pp3ers6orsvx7kfbodefbbm2xin6hdicsrz5lhra"
        onInit={(editor) => (editorRef.current = editor)}
        initialValue="Your blog body here!</p>"
        value={blogBody} // here it helps in binding content of editor to blogBody statevarible
        onEditorChange={handleEditorChange}
        init={{
          height: 600,
          
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "emoticons",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <Button button="Add blog" onClick={AddBlog} />
    </>
  );
}

export default CreateBlog;
