import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
function Me() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post(
        `${BACKEND_URL}/api/v1/user/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (!response.data.Userid) {
          navigate("/signin");
        } else {
          navigate("/blogs");
        }
      })
      .catch(() => {
        navigate("/signin");
      });
  }, []);
  return <></>;
}

export default Me;
