import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface BlogType {
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

export interface blogIdType {
  id: string;
  title: string;
  body:string;
  authorname:string;
}

export function  useBlogbyId ({id} : {id: string}){
  const [blogById , setBlogById] = useState<blogIdType>()
  const [loading , setloading] = useState(true)

  useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
      headers:{
        Authorization : `Bearer ${localStorage.getItem("token")}`
      }
    }).then((response) =>{
      setBlogById(response.data.YourBlogs)
      setloading(false)
    })
  },[id])
  return {
    loading,
    blogById
  }
}

export default useBlog;
