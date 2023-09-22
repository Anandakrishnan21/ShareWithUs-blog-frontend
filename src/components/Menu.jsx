import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Menu({ cat }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://share-with-us.onrender.com/api/posts/?cat=${cat}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="w-full md:w-2/4 flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Other posts you may like</h1>
      {posts.map((post) => (
        <div key={post.id} className="flex flex-col gap-2 items-start">
          <img
            src={`../upload/${post.img}`}
            alt="img"
            className="h-60 w-full object-cover rounded"
          />
          <h1 className="text-lg font-bold">{post.title}</h1>
          <Link to={`/post/${post.id}`}>
            <button className="bg-green-100 border-2 border-green-600 p-2 rounded">
              Read More
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Menu;
