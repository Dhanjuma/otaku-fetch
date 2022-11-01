import React from "react";
import { HiOutlineBookmark, HiBookmark } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context";
// import { useFetch } from "../useFetch";

const AllAnime = ({ data, genreName, isSearching }) => {
  const { markAnime, animeBookMarks } = useGlobalContext();

  // const { detail } = useFetch("https://api.jikan.moe/v4/genres/manga");
  // console.log(detail);
  return (
    <article>
      <h1 className="title">
        {genreName ? genreName : isSearching ? "RESULTS" : "TOP ANIME"}
      </h1>
      <main className="manga-container">
        {data.map((anime) => {
          const {
            mal_id,
            title,
            title_japanese,
            episodes,
            rank,
            images,
            status,
            genres,
          } = anime;
          let alreadyExists = animeBookMarks.some((one) => {
            return one.mal_id === mal_id;
          });

          return (
            <article key={mal_id} className="manga">
              <img
                style={{ maxWidth: "100%" }}
                src={images.jpg.large_image_url}
                alt=""
              />
              <section>
                <h4>
                  TITLE :<span> {title} </span> <br />
                </h4>
                <h4>
                  JAPANESE : <span>{title_japanese}</span>
                </h4>
                {episodes && (
                  <h4>
                    EPISODES : <span>{episodes}</span>
                  </h4>
                )}
                <h4>
                  RANK : <span>{rank}</span>
                </h4>
                <h4>
                  STATUS : <span>{status}</span>
                </h4>

                <h4>
                  GENRES :
                  {genres.map((a, index) => {
                    return <span key={index}> {a.name},</span>;
                  })}
                </h4>
              </section>
              <Link to={`/anime/${mal_id}`}>
                <button className="read-btn">read more</button>
              </Link>
              <div className="bookmark" onClick={() => markAnime(anime)}>
                {alreadyExists ? <HiBookmark /> : <HiOutlineBookmark />}
              </div>
            </article>
          );
        })}
      </main>
    </article>
  );
};

export default AllAnime;
