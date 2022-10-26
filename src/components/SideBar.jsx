import React from "react";
import { Link } from "react-router-dom";
import data from "../data";

import { useGlobalContext } from "../Context";
// import { FaTimes } from "react-icons/fa";

const SideBar = () => {
  const { showSideBar, activePage, togglePage, bookMarkCount } =
    useGlobalContext();
  return (
    <main
      className={`${showSideBar ? "sidebar-wrapper show" : "sidebar-wrapper"}`}
    >
      <ul className="sidebar">
        {data.map((item, index) => {
          const { path, icon, text } = item;
          return (
            <li
              key={index}
              onClick={(e) => togglePage(e)}
              className={`${text === activePage && "active"}`}
            >
              <Link to={path} className="links">
                <p>{icon}</p>
                <p>{text}</p>
                {text === "BookMarks" && (
                  <p className="count">{bookMarkCount}</p>
                )}
              </Link>
            </li>
          );
        })}
        {/* <li className="active" onClick={(e) => togglePage(e)}>
          <Link to={"/"}>
            <HiOutlineBookmarkAlt /> BookMarks
          </Link>
        </li>
        <li className="active" onClick={(e) => togglePage(e)}>
          <Link to={"/anime"}>
            <HiOutlineFilm /> Anime
          </Link>
        </li>
        <li onClick={(e) => togglePage(e)}>
          <Link to={"/manga"}>
            <HiOutlineBookOpen /> Manga
          </Link>
        </li> */}
      </ul>
    </main>
  );
};

export default SideBar;

// className={`${cat === specific && "active"}`}
