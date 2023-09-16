import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { registers } from "../utils/Contants";

function Login() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(inputs, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div
      className="w-full h-screen
     bg-teal-100 flex flex-col m-auto justify-center items-center gap-2 font-mono"
    >
      <h1 className="text-2xl font-bold">Login</h1>
      <form
        autoComplete="off"
        className="flex flex-col w-5/6 md:w-3/6 h-80 md:h-96 justify-center items-center bg-white gap-3 rounded"
      >
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
          Login
        </button>
        {error && <p className="text-red-500 font-bold">{error}</p>}
        <span>
          Create an account ?{" "}
          <Link to="/register" className="text-blue-400">
            Register
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
