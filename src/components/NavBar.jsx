import React from "react";
import { Link } from "react-router-dom";
import {
  HiMenuAlt2,

  // HiTrash,
} from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import data from "../data";
import { useGlobalContext } from "../Context";

const NavBar = () => {
  const { showSideBar, toggleSideBar, activePage, togglePage } =
    useGlobalContext();
  return (
    <nav className="navigation">
      <h2>OTAKU Fetch</h2>
      <ul className="paths show-paths">
        {data.map((item, index) => {
          const { path, icon, text } = item;
          return (
            <li
              key={index}
              onClick={(e) => togglePage(e)}
              className={` "links" ${text === activePage && "active"}`}
            >
              <Link to={path} className="links">
                <p>{icon}</p>
                <p>{text}</p>
              </Link>
            </li>
          );
        })}
        {/* <li>
          <Link to={"/"}>
            <HiOutlineBookmarkAlt /> BookMarks
          </Link>
        </li>
        <li className="active">
          <Link to={"/anime"}>
            <HiOutlineFilm /> Anime
          </Link>
        </li>
        <li>
          <Link to={"/manga"}>
            <HiOutlineBookOpen /> Manga
          </Link>
        </li> */}
      </ul>
      <button className="toggle" onClick={toggleSideBar}>
        {showSideBar ? <FaTimes /> : <HiMenuAlt2 />}
      </button>
    </nav>
  );
};

export default NavBar;
