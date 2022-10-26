import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

const Anime = () => {
  const [loading, setLoading] = React.useState(true);
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  let animeUrl;
  isSearching
    ? (animeUrl = `https://api.jikan.moe/v4/anime?q=${searchTerm}`)
    : (animeUrl = `https://api.jikan.moe/v4/anime`);

  console.log(animeUrl);

  const fetchAnime = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${animeUrl}${searchTerm}`);
      const data = await response.json();
      console.log(data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm, animeUrl]);

  React.useEffect(() => {
    fetchAnime();
  }, [fetchAnime]);
  return (
    <main>
      <section className="header">
        <h1>ANIME</h1>
        <form className="input">
          <label htmlFor="search">
            <HiOutlineSearch />:
          </label>
          <input type="search" name="search" id="search" placeholder="Gantz" />
        </form>
      </section>
    </main>
  );
};

export default Anime;
