import React from "react";
import { useGlobalContext } from "../Context";
import { HiOutlineBookmark, HiBookmark } from "react-icons/hi";
import { Link } from "react-router-dom";

const Bookmarks = () => {
  const { mangaBookMarks, markManga, markAnime, animeBookMarks } =
    useGlobalContext();
  console.log(mangaBookMarks, animeBookMarks);
  return (
    <>
      {animeBookMarks && (
        <article>
          <h2 className="heading">ANIME</h2>
          <section className="bookmark-container">
            {animeBookMarks.map((anime) => {
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
                <div key={mal_id}>
                  <main className="manga-bookmark">
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
                  </main>
                </div>
              );
            })}
          </section>
        </article>
      )}
      {mangaBookMarks && (
        <article>
          <h2 className="heading">MANGA</h2>
          <section className="bookmark-container">
            {mangaBookMarks.map((manga) => {
              const {
                mal_id,
                title,
                title_japanese,
                authors,
                rank,
                images,
                status,
                genres,
              } = manga;
              let alreadyExists = mangaBookMarks.some((one) => {
                return one.mal_id === mal_id;
              });
              return (
                <div key={mal_id}>
                  <main className="manga-bookmark">
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
                      {authors.length >= 1 && (
                        <h4>
                          AUTHOR :<span>{authors[0].name}</span>
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
                    <Link to={`/manga/${mal_id}`}>
                      <button className="read-btn">read more</button>
                    </Link>
                    <div className="bookmark" onClick={() => markManga(manga)}>
                      {alreadyExists ? <HiBookmark /> : <HiOutlineBookmark />}
                    </div>
                  </main>
                </div>
              );
            })}
          </section>
        </article>
      )}
    </>
  );
};

export default Bookmarks;
