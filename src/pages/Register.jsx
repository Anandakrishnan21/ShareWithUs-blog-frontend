import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registers } from "../utils/Contants";

function Register() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://share-with-us.onrender.com/api/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div
      className="w-full h-screen
     bg-teal-100 flex flex-col m-auto justify-center items-center gap-2 font-mono"
    >
      <h1 className="text-2xl font-bold">Register</h1>
      <form className="flex flex-col w-5/6 md:w-3/6 h-80 md:h-96 justify-center items-center bg-white gap-3 rounded">
        {registers.map((register, index) => (
          <input
            key={index}
            type={register.text}
            placeholder={register.placeholder}
            name={register.name}
            className="w-5/6 border-2 border-black p-2 rounded"
            onChange={handleChange}
          />
        ))}
        <button
          className="w-5/6 border-2 border-green-600 bg-green-200 p-2 rounded"
          onClick={handleSubmit}
        >
          Register
        </button>
        {err && <p className="text-red-500 font-bold">{err}</p>}
        <span>
          Do you have an account ?{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Register;
