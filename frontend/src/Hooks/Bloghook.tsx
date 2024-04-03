import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface BlogType {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorname: string;
}

function useBlog() {
  const [loading, setloading] = useState(true);
  const [allBlogs, setAllBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`).then((response) => {
      setAllBlogs(response.data.Blogs);
      setloading(false);
    });
  }, []);
  return {
    allBlogs,
    loading,
  };
}
export default useBlog;
