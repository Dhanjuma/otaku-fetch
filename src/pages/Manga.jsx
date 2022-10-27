import React from "react";

import AllManga from "../components/AllManga";
import ButtonsContainer from "../components/ButtonsContainer";
import Loading from "../components/Loading";
// import SingleManga from "../components/SingleManga";

const Manga = () => {
  const [loading, setLoading] = React.useState(true);
  const [lastPage, setLastPage] = React.useState(true);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [term, setTerm] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState();
  // const [singleManga, setSingleManga] = React.useState([]);
  const [mangaUrl, setMangaUrl] = React.useState(
    `https://api.jikan.moe/v4/top/manga?page=${page}`
  );

  // console.log(singleManga);
  // let a = parseInt(page) === 1;
  // console.log(page, mangaUrl);

  const fetchManga = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(mangaUrl);
      const data = await res.json();
      setLastPage(data.pagination.last_visible_page);
      setData(data);
      setLoading(false);
      setIsSubmitted(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    return()=>{}
  }, [mangaUrl]);

  React.useEffect(() => {
    fetchManga();
  }, [fetchManga]);

  React.useEffect(() => {
    if (!isSearching) {
      setMangaUrl(`https://api.jikan.moe/v4/top/manga?page=${page}`);
    } else if (isSearching && isSubmitted) {
      setMangaUrl(`https://api.jikan.moe/v4/manga?q=${term}&page=${page}`);
    }
  }, [page, isSearching, term, isSubmitted]);

  const findManga = (e) => {
    e.preventDefault();
    if (term) {
      setMangaUrl(`https://api.jikan.moe/v4/manga?q=${term}&page=1`);
      setIsSearching(true);
      setIsSubmitted(true);
      setPage(1);
    } else {
      setMangaUrl(`https://api.jikan.moe/v4/top/manga?page=1`);
      setIsSearching(false);
    }
  };

  // const setOne = () => {
  //   setShowMore(true);
  //   // setSingleManga(manga);
  // };

  return (
    <main>
      <section className="header">
        <h1>MANGA</h1>

        <form className="input" onSubmit={findManga}>
          <input
            type="search"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
            }}
          />
          <button type="submit" className="btn">
            Find
          </button>
        </form>

        {isSearching && (
          <h3
            className="btn"
            onClick={() => {
              setMangaUrl(`https://api.jikan.moe/v4/top/manga?page=1`);
              setIsSearching(false);
              setTerm("");
              setPage(1);
            }}
          >
            back to home
          </h3>
        )}
      </section>
      {data && (
        <ButtonsContainer page={page} lastPage={lastPage} setPage={setPage} />
      )}

      {loading && <Loading />}

      {!data && !loading && <div>NOT FOUND</div>}

      {data && !loading && <AllManga data={data.data} />}
      {/* {data && !loading && showMore && (
        <SingleManga
          // singleManga={singleManga}
          // setOne={setOne}
          setShowMore={setShowMore}
        />
      )} */}
    </main>
  );
};

export default Manga;

// const handleChange = (e) => {
//   setTerm(e.target.value);
// };
// const find = (e) => {
//   e.preventDefault();

//   if (!term) {
//     setMangaUrl(`https://api.jikan.moe/v4/top/manga?limit=24`);
//     setIsSearching(false);
//   } else {
//     // setSearchTerm(term);
//     setMangaUrl(`https://api.jikan.moe/v4/manga?q=${term}`);
//     setIsSearching(true);
//   }
// };
// React.useEffect(() => {
//   isSearching &&
//     setMangaUrl(`https://api.jikan.moe/v4/manga?q=${searchTerm}`);
// }, [searchTerm, isSearching]);

// const fetchManga = React.useCallback(async () => {
//   setLoading(true);

//   try {
//     const response = await fetch(mangaUrl);
//     const data = await response.json();
//     console.log(data.data);
//     const all = data.data;
//     setData(all);
//     setLoading(false);
//     // setIsSearching(false);
//   } catch (error) {
//     console.log(error);
//     setLoading(false);
//   }
// }, [mangaUrl]);

// React.useEffect(() => {
//   fetchManga();
// }, [fetchManga]);
