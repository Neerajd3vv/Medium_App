import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface BlogType {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorname: string;
  publishDate: string;
}

export function useBlog() {
  const [loading, setloading] = useState(true);
  const [allBlogs, setAllBlogs] = useState<BlogType[]>([]);
  const [blogSearch, setBlogSearch] = useState("");
  useEffect(() => {
    const encodedTitle = encodeURIComponent(blogSearch);

    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk?title=${encodedTitle}`)
      .then((response) => {
        setAllBlogs(response.data.Blogs);
        setloading(false);
      });
  }, [blogSearch]);

  // console.log(allBlogs);

  return {
    allBlogs,
    loading,
    setBlogSearch,
    blogSearch,
  };
}

export interface blogIdType {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorname: string;
  publishDate: string;
  authorBio: string;
}

export function useBlogbyId({ id }: { id: string }) {
  const [blogById, setBlogById] = useState<blogIdType>();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlogById(response.data);
        setloading(false);
      });
  }, [id]);
  return {
    loading,
    blogById,
  };
}

interface AuthorBlogs {
  id: string;
  authorId: string;
  title: string;
  body: string;
  authorname: string;
  publishDate: string;
}

export function usePersonalBlogs() {
  const [loading, setloading] = useState(true);
  const [myPersonalblog, setMyPersonalBlog] = useState<AuthorBlogs[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/author-blog`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setMyPersonalBlog(response.data.AuthorBlogs);
        setloading(false);
      });
  }, []);

  return {
    loading,
    myPersonalblog,
  };
}

export default useBlog;

// +++++++++++++++ logged in bases avatar showcase ++++++++++++

interface userDataType {
  id: string;
  username: string;
  email: string;
  password: string;
}

export function useLoggedUser() {
  const [userData, setUserData] = useState<userDataType | null>(null);

  const getUserData = async (token: string) => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/loggedinuser`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userData = response.data.User;

    setUserData(userData);
  };

  const fetchUserData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserData(token);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    userData,
  };
}

// Is user exists with such token or not on that bases render one of two appbar

export function useTokenExists() {
  const [userTokenExists, setUserTokenExists] = useState(false);
  const fetchUserData = async (token: string) => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/loggedinuser`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userData = response.data.User;
    if (userData) {
      setUserTokenExists(true);
    } else {
      setUserTokenExists(false);
    }
  };

  const getUserData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return {
    userTokenExists,
  };
}

// is user has bio or not
interface userProfileType {
  id: string;
  profileId: string;
  profilePicture: string;
  bio: string;
}

export function useUserBioChecking() {
  const [userBioValue, setUserBioValue] = useState(false);
  const [userProfile, setUserProfile] = useState<userProfileType>();

  useEffect(() => {
    axios
      .post(
        `${BACKEND_URL}/api/v1/user/userbiocheck`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response) {
          // console.log(response.data);

          setUserProfile(response.data.UserProfile);
        }
        if (response.data.UserProfile.bio) {
          // console.log(response.data.UserProfile);
          setUserBioValue(true);
        }
      });
  }, []);
  return {
    userBioValue,
    userProfile,
  };
}
