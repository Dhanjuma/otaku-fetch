import React from "react";

import AllAnime from "../components/AllAnime";
import ButtonsContainer from "../components/ButtonsContainer";
import Loading from "../components/Loading";
// import SingleManga from "../components/SingleManga";

const Anime = () => {
  const [loading, setLoading] = React.useState(true);
  const [lastPage, setLastPage] = React.useState(true);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [term, setTerm] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState();
  const [genre, setGenre] = React.useState();
  const [isShowingGenres, setIsShowingGenres] = React.useState(false);
  const [isShowingSpecificGenre, setIsShowingSpecificGenre] =
    React.useState(false);
  const [specificGenre, setSpecificGenre] = React.useState();
  const [specificGenreName, setSpecificGenreName] = React.useState("");

  // const [singleManga, setSingleManga] = React.useState([]);
  const [animeUrl, setAnimeUrl] = React.useState(
    `https://api.jikan.moe/v4/top/anime?page=${page}`
  );

  console.log(genre);
  React.useEffect(() => {
    fetch(`https://api.jikan.moe/v4/genres/anime`)
      .then((response) => response.json())
      .then((myJson) => setGenre(myJson.data));
  }, []);
  console.log(animeUrl, lastPage, data);

  const fetchAnime = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(animeUrl);
      const data = await res.json();
      setLastPage(data.pagination.last_visible_page);
      setData(data);
      setLoading(false);
      setIsSubmitted(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [animeUrl]);

  React.useEffect(() => {
    fetchAnime();
    return () => {};
  }, [fetchAnime]);

  React.useEffect(() => {
    if (!isSearching && !isShowingSpecificGenre) {
      setAnimeUrl(`https://api.jikan.moe/v4/top/anime?page=${page}`);
    } else if (isSearching && isSubmitted && !isShowingSpecificGenre) {
      setAnimeUrl(`https://api.jikan.moe/v4/anime?q=${term}&page=${page}`);
    } else if (isShowingSpecificGenre) {
      setAnimeUrl(
        `https://api.jikan.moe/v4/anime?genres=${specificGenre}&page=${page}`
      );
    }
  }, [
    page,
    isSearching,
    term,
    isSubmitted,
    specificGenre,
    isShowingSpecificGenre,
  ]);

  const findAnime = (e) => {
    e.preventDefault();
    if (term) {
      setAnimeUrl(`https://api.jikan.moe/v4/anime?q=${term}&page=1`);
      setIsSearching(true);
      setIsSubmitted(true);
      setPage(1);
    } else {
      setAnimeUrl(`https://api.jikan.moe/v4/top/anime?page=1`);
      setIsSearching(false);
    }
  };

  const handleGenre = (mal_id, name) => {
    setPage(1);
    setAnimeUrl(`https://api.jikan.moe/v4/anime?genres=${mal_id}&page=1`);
    setIsShowingSpecificGenre(true);
    setSpecificGenre(mal_id);
    setIsShowingGenres((p) => !p);
    setSpecificGenreName(name);
  };

  // const setOne = () => {
  //   setShowMore(true);
  //   // setSingleManga(manga);
  // };

  return (
    <main>
      <section className="header">
        <h1>ANIME</h1>

        <form className="input" onSubmit={findAnime}>
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
        <button
          onClick={() => {
            setIsShowingGenres((p) => !p);
          }}
          className="btn"
        >
          {isShowingGenres ? "hide" : "show"} categories
        </button>
        {(isSearching || isShowingSpecificGenre) && (
          <h3
            className="btn"
            onClick={() => {
              setAnimeUrl(`https://api.jikan.moe/v4/top/anime?page=1`);
              setIsSearching(false);
              setTerm("");
              setPage(1);
              setIsShowingSpecificGenre(false);
              setSpecificGenreName("");
            }}
          >
            back to home
          </h3>
        )}
      </section>

      {isShowingGenres && (
        <div className="genre-container">
          {genre &&
            genre.map((a) => {
              const { mal_id, name } = a;
              return (
                <button
                  className="genre-btn"
                  key={mal_id}
                  onClick={() => handleGenre(mal_id, name)}
                  style={{
                    background: mal_id === specificGenre && "#000",
                    color: mal_id === specificGenre && "#fff",
                    border: mal_id === specificGenre && "2px solid #fff",
                  }}
                >
                  {name}
                </button>
              );
            })}
        </div>
      )}

      {data && (
        <ButtonsContainer page={page} lastPage={lastPage} setPage={setPage} />
      )}

      {loading && <Loading />}

      {!data && !loading && <div>NOT FOUND</div>}

      {data && !loading && (
        <AllAnime data={data.data} genreName={specificGenreName} />
      )}
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

export default Anime;

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
