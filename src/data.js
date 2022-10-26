import {
  HiOutlineFilm,
  HiOutlineBookmarkAlt,
  HiOutlineBookOpen,
} from "react-icons/hi";

const data = [
  {
    path: "/",
    icon: <HiOutlineBookmarkAlt />,
    text: "BookMarks",
  },
  {
    path: "/anime",
    icon: <HiOutlineFilm />,
    text: "Anime",
  },
  {
    path: "/manga",
    icon: <HiOutlineBookOpen />,
    text: "Manga",
  },
];

export default data;
