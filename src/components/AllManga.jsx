import React from "react";
import { HiOutlineBookmark, HiBookmark } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../Context";

const AllManga = ({ data }) => {
  const { markManga, mangaBookMarks } = useGlobalContext();

  return (
    <article>
      <h1 className="title">TOP MANGA</h1>
      <main className="manga-container">
        {data.map((manga) => {
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
            </article>
          );
        })}
      </main>
    </article>
  );
};

export default AllManga;
