import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://share-with-us.onrender.com/api/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const text = doc.body.textContent;
    return text.split(" ").slice(0, 50).join(" ") + " ...";
  };

  return (
    <div className="font-mono p-4">
      <div className="max-w-6xl m-auto flex flex-col justify-center items-center gap-5">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col md:odd:flex-row md:even:flex-row-reverse justify-around gap-5 items-center"
          >
            <div className="w-full md:w-2/6 h-80 md:h-96 flex">
              <img
                src={`../upload/${post.img}`}
                alt="img"
                className="w-full h-full rounded object-cover"
              />
            </div>
            <div className="w-full md:w-4/6 flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <h1 className="text-xl md:text-2xl font-bold">{post.title}</h1>
                <p className="text-justify">{getText(post.desc)}</p>
              </div>
              <Link to={`/post/${post.id}`}>
                <button className="bg-green-100 border-2 border-green-600 p-2 rounded">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
