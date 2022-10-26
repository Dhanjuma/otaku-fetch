import React from "react";
import { NavLink } from "react-router-dom";
import data from "../data";

import { useGlobalContext } from "../Context";
// import { FaTimes } from "react-icons/fa";

const SideBar = () => {
  const { showSideBar, bookMarkCount } = useGlobalContext();
  return (
    <main
      className={`${showSideBar ? "sidebar-wrapper show" : "sidebar-wrapper"}`}
    >
      <ul className="sidebar">
        {data.map((item, index) => {
          const { path, icon, text } = item;
          return (
            <li key={index}>
              <NavLink
                to={path}
                className="links"
                style={({ isActive }) => ({
                  color: isActive && "#fff",
                  background: isActive && "#000",
                })}
                end
              >
                <p>{icon}</p>
                <p>{text}</p>
                {text === "BookMarks" && (
                  <p className="count">{bookMarkCount}</p>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default SideBar;

// className={`${cat === specific && "active"}`}
// {
//   /* <li className="active" onClick={(e) => togglePage(e)}>
//           <Link to={"/"}>
//             <HiOutlineBookmarkAlt /> BookMarks
//           </Link>
//         </li>
//         <li className="active" onClick={(e) => togglePage(e)}>
//           <Link to={"/anime"}>
//             <HiOutlineFilm /> Anime
//           </Link>
//         </li>
//         <li onClick={(e) => togglePage(e)}>
//           <Link to={"/manga"}>
//             <HiOutlineBookOpen /> Manga
//           </Link>
//         </li> */
// }
