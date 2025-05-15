import { Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

function Navbar() {
  return (
    <>
      <div className="bg-[linear-gradient(100deg,_rgba(238,174,202,1)_0%,_rgba(148,187,233,1)_100%)] p-4 ">
        <div className="max-w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <p className="text-xl font-display">ProfileMap Viewer</p>

          <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-12 text-base md:text-lg font-serif">
            <li>
              <Link className="hover:underline" to="/">
                Home
              </Link>
            </li>
            <li className="hover:underline">
              <Link to="/list">Profile's</Link>
            </li>
          </ul>

          <div className="flex gap-10">
            <a href="https://www.linkedin.com/in/sahil-phalke" target="_blank">
              <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a href="https://github.com/Sahilphalke" target="_blank">
              <Github className="w-5 h-5 md:w-6 md:h-6" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
