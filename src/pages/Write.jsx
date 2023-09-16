import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { radioButtons } from "../utils/Contants";

function Write() {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "https://share-with-us.onrender.com/api/upload",
        formData,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(
            `https://share-with-us.onrender.com/api/posts/${state.id}`,
            {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : "",
            },
            {
              withCredentials: true,
            }
          )
        : await axios.post(
            `https://share-with-us.onrender.com/api/posts/`,
            {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : "",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
              withCredentials: true,
            }
          );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="font-mono p-4">
      <div className="max-w-6xl m-auto flex flex-col md:flex-row items-center justify-start gap-5">
        <div className="w-full md:w-4/6 flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border-2 border-stone-300"
          />
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="md:h-96"
          />
        </div>
        <div className="w-full md:w-2/6 flex flex-col gap-10">
          <div className="border-2 border-stone-300 w-full p-2 py-5 gap-3">
            <h1 className="text-center text-xl font-bold">Published</h1>
            <div className="flex flex-col gap-2">
              <span className="flex gap-2">
                <p>Status:</p>
                Draft
              </span>
              <span className="flex gap-2">
                <p>Visibility:</p>
                Public
              </span>
              <input
                type="file"
                className="hidden"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label htmlFor="file" className="text--xl font-bold underline">
                Upload
              </label>
            </div>
            <div className="flex">
              <button
                className="bg-green-100 border-2 border-green-600 h-8 p-1 rounded"
                onClick={handleSubmit}
              >
                Publish
              </button>
            </div>
          </div>
          <div className="border-2 border-stone-300 w-full p-2 py-5 gap-3">
            <h1 className="text-center text-xl font-bold">Category</h1>
            {radioButtons.map((item,index) => (
              <div className="flex items-center gap-3" key={index}>
                <input
                  type="radio"
                  value={item.value}
                  name="cat"
                  checked={cat === item.value}
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor={item.value}>{item.label}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
