import React from "react";

const Context = React.createContext();
// const mangaUrl ="https://api.jikan.moe/v4/manga?q="

// const getLocalStorage = () => {
//   let activePage = localStorage.getItem("page");
//   if (activePage) {
//     return (activePage = JSON.parse(localStorage.getItem("page")));
//   } else {
//     return "Bookmarks";
//   }
// };
const getLocalManga = () => {
  let mangaBookmarks = localStorage.getItem("mangaBookmark");
  if (mangaBookmarks) {
    return (mangaBookmarks = JSON.parse(localStorage.getItem("mangaBookmark")));
  } else {
    return [];
  }
};
// const getLocalAnime = () => {
//   let animeBookmarks = localStorage.getItem("animeBookmark");
//   if (animeBookmarks) {
//     return (animeBookmarks = JSON.parse(localStorage.getItem("animeBookmark")));
//   } else {
//     return [];
//   }
// };

export const AppContext = ({ children }) => {
  // const [activePage, setActivePage] = React.useState("");
  const [showSideBar, setShowSideBar] = React.useState(false);
  const [mangaBookMarks, setMangaBookMarks] = React.useState(getLocalManga());
  // const [animeBookMarks, setAnimeBookMarks] = React.useState(getLocalAnime());
  const [bookMarkCount, setBookMarkCount] = React.useState(0);

  React.useEffect(() => {
    setBookMarkCount(mangaBookMarks.length);
  }, [mangaBookMarks]);

  // React.useEffect(() => {
  //   setActivePage("BookMarks");
  // }, []);
  //   React.useEffect(() => {
  // setBookMarkCount(mangaBookMarks.length + animeBookMarks.length)
  //   }, [mangaBookMarks, animeBookMarks]);

  // React.useEffect(() => {
  //   localStorage.setItem("page", JSON.stringify(activePage));
  // }, [activePage]);

  React.useEffect(() => {
    localStorage.setItem("mangaBookmark", JSON.stringify(mangaBookMarks));
  }, [mangaBookMarks]);

  // React.useEffect(() => {
  //   localStorage.setItem("animeBookmark", JSON.stringify(animeBookMarks));
  // }, [animeBookMarks]);

  // React.useEffect(() => {
  // setActivePage("Bookmarks");
  // }, []);
  console.log(bookMarkCount);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  // const togglePage = (e) => {
  //   setActivePage(e.target.textContent);
  // };

  const markManga = (manga) => {
    let alreadyExists = mangaBookMarks.some((one) => {
      return one.mal_id === manga.mal_id;
    });
    if (alreadyExists) {
      setMangaBookMarks((prev) => {
        return prev.filter((p) => {
          return p.mal_id !== manga.mal_id;
        });
      });
    } else {
      setMangaBookMarks((prev) => {
        return [...prev, manga];
      });
    }
  };

  return (
    <Context.Provider
      value={{
        showSideBar,
        toggleSideBar,
        // activePage,
        // togglePage,
        markManga,
        mangaBookMarks,
        bookMarkCount,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => {
  return React.useContext(Context);
};
