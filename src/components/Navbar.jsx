import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { navLinks } from "../utils/Contants";
import { AuthContext } from "../context/authContext";
import { UserCircleIcon } from "@heroicons/react/solid";
import logo from "/logo-color.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleButton = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav
      className={`w-full sticky top-0 z-[1] font-mono bg-white ${
        isScrolled ? "shadow-lg" : ""
      } p-2`}
    >
      <div className="max-w-6xl m-auto flex justify-between items-center p-2 ">
        <div>
          <Link to="/">
            <img src={logo} alt="logo" className="w-16" />
          </Link>
        </div>
        <Nav className="hidden md:block ">
          <ul className="list-none flex space-x-10 items-center">
            {navLinks.map((navLink) => (
              <li key={navLink.id}>
                <Nav.Link as={NavLink} to={navLink.link}>
                  {navLink.name}
                </Nav.Link>
              </li>
            ))}
            <span className="flex items-center text-teal-900 font-bold">
              <UserCircleIcon className="w-8 h-8 text-red-500" />
              {currentUser?.username}
            </span>
            {currentUser ? (
              <span onClick={logout}>LOGOUT</span>
            ) : (
              <li>
                <Link to="/login">LOGIN</Link>
              </li>
            )}
          </ul>
        </Nav>
        <div className="flex md:hidden">
          <button onClick={toggleButton}>
            {isOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden p-2 ">
          <Nav className="w-full bg-teal-100 rounded p-2 ">
            <ul className="list-none flex flex-col space-y-5 ">
              {navLinks.map((navLink) => (
                <li
                  key={navLink.id}
                  className="w-full hover:bg-teal-300 duration-500 p-2 rounded"
                >
                  <Nav.Link as={NavLink} to={navLink.link}>
                    {navLink.name}
                  </Nav.Link>
                </li>
              ))}
              <span className="flex items-center text-teal-900 hover:text-black font-bold w-full hover:bg-teal-300 duration-500 p-2 rounded">
                <UserCircleIcon className="w-8 h-8 text-red-500" />
                {currentUser?.username}
              </span>
              {currentUser ? (
                <span
                  className="w-full hover:bg-teal-300 duration-500 p-2 rounded"
                  onClick={logout}
                >
                  Logout
                </span>
              ) : (
                <li className="w-full hover:bg-teal-300 duration-500 p-2 rounded">
                  <Link to="/login">Login</Link>
                </li>
              )}
            </ul>
          </Nav>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
