import React from "react";
import { HiOutlineBookmark, HiBookmark } from "react-icons/hi";
import { useGlobalContext } from "../Context";
import RecommendedManga from "./RecommendedManga";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";

// {
// setShowMore;
// }
const SingleManga = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [singleManga, setSingleManga] = React.useState(false);
  const [recomData, setRecomData] = React.useState();

  const url = `https://api.jikan.moe/v4/manga/${id}`;

  const fetchSingleManga = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setSingleManga(data.data);
      // console.log(data.data, url, id);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [url]);

  React.useEffect(() => {
    fetchSingleManga();
    return () => {};
  }, [fetchSingleManga]);

  const fetchRecommended = React.useCallback(async () => {
    const res = await fetch(
      `https://api.jikan.moe/v4/manga/${id}/recommendations?limit=10`
    );
    const data = await res.json();
    const all = data.data;
    setRecomData(all);
  }, [id]);

  React.useEffect(() => {
    singleManga && fetchRecommended();
    return () => {};
  }, [singleManga, fetchRecommended]);

  const {
    mal_id,
    title,
    title_japanese,
    authors,
    rank,
    images,
    status,
    score,
    popularity,
    type,
    published,
    synopsis,
    genres,
    volumes,
    chapters,
  } = singleManga;

  const { markManga, mangaBookMarks } = useGlobalContext();
  let alreadyExists = mangaBookMarks.some((one) => {
    return one.mal_id === mal_id;
  });

  if (loading) {
    return <Loading />;
  } else if (singleManga) {
    return (
      <main className="single-manga-container">
        <Link to={`/manga`}>
          <button
            className="read-btn"
            // onClick={() => {
            //   setShowMore(false);
            // }}
          >
            back to manga home
          </button>
        </Link>

        {singleManga && (
          <article key={mal_id} className="single-manga">
            <img
              // style={{ maxWidth: "50%" }}
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
                SCORE : <span>{score}</span>
              </h4>
              <h4>
                POPULARITY : <span> {popularity}</span>
              </h4>
              <h4>
                TYPE : <span>{type}</span>
              </h4>
              <h4>
                STATUS : <span>{status}</span>
              </h4>
              <h4>
                PUBLISHED : <span> {published.string}</span>
              </h4>
              {volumes && (
                <h4>
                  VOLUMES : <span> {volumes}</span>
                </h4>
              )}
              {chapters && (
                <h4>
                  CHAPTERS : <span>{chapters}</span>
                </h4>
              )}
              <h4>
                GENRES :
                {genres.map((a, index) => {
                  return <span key={index}> {a.name},</span>;
                })}
              </h4>
              <h4>
                SYNOPSIS :<span> {synopsis}</span>
              </h4>
            </section>
            <div className="bookmark" onClick={() => markManga(singleManga)}>
              {alreadyExists ? <HiBookmark /> : <HiOutlineBookmark />}
            </div>
          </article>
        )}

        {recomData && (
          <section>
            <h1>Recommended</h1>
            <RecommendedManga id={mal_id} recomData={recomData} />
          </section>
        )}
      </main>
    );
  }
};

export default SingleManga;
