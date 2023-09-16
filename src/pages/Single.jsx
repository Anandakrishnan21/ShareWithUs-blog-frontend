import React, { useContext, useEffect, useState } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

function Single() {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://share-with-us.onrender.com/api/posts/${postId}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://share-with-us.onrender.com/api/posts/${postId}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="font-mono p-4">
      <div className="max-w-6xl m-auto flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-4/6 flex flex-col gap-2">
          <img
            src={`../upload/${posts?.img}`}
            alt="img"
            className="w-full h-72 object-cover rounded"
          />
          <div className="flex gap-3">
            <UserCircleIcon className="w-8 h-8 text-red-500" />
            <div className="">
              <span className="text-teal-900 font-bold">{posts.username}</span>
              <p>Posted {moment(posts.date).fromNow()}</p>
            </div>
            {currentUser && posts && currentUser.username === posts.username && (
              <div className="flex gap-2 items-center">
                <Link
                  to={`/write?edit=2`}
                  state={posts}
                  className="bg-teal-100 rounded-full p-2"
                >
                  <PencilIcon className="w-6 h-6 " />
                </Link>
                <Link to="" className="bg-red-100 rounded-full p-2">
                  <TrashIcon onClick={handleDelete} className="w-6 h-6" />
                </Link>
              </div>
            )}
          </div>
          <h1 className="text-xl md:text-2xl font-bold">{posts.title}</h1>
          <div>
            <p
              className="text-justify"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(posts.desc),
              }}
            />
          </div>
        </div>
        <Menu cat={posts.cat} />
      </div>
    </div>
  );
}

export default Single;
