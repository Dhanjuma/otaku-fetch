import React from "react";
import { HiOutlineBookmark, HiBookmark } from "react-icons/hi";
import { useGlobalContext } from "../Context";
import RecommendedAnime from "./RecommendedAnime";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";

// {
// setShowMore;
// }
const SingleAnime = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [singleAnime, setSingleAnime] = React.useState(false);
  const [recomData, setRecomData] = React.useState();

  const url = `https://api.jikan.moe/v4/anime/${id}`;

  const fetchSingleAnime = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setSingleAnime(data.data);
      // console.log(data.data, url, id);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [url]);

  React.useEffect(() => {
    fetchSingleAnime();
    return () => {};
  }, [fetchSingleAnime]);

  const fetchRecommended = React.useCallback(async () => {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime/${id}/recommendations?limit=10`
    );
    const data = await res.json();
    const all = data.data;
    setRecomData(all);
  }, [id]);

  React.useEffect(() => {
    singleAnime && fetchRecommended();
    return () => {};
  }, [singleAnime, fetchRecommended]);

  const {
    mal_id,
    title,
    title_japanese,
    producers,
    rank,
    images,
    status,
    score,
    popularity,
    type,
    aired,
    synopsis,
    genres,
    source,
    episodes,
    duration,
    season,
    year,
    studios,
  } = singleAnime;

  const { markAnime, animeBookMarks } = useGlobalContext();
  let alreadyExists = animeBookMarks.some((one) => {
    return one.mal_id === mal_id;
  });

  if (loading) {
    return <Loading />;
  } else if (singleAnime) {
    return (
      <main className="single-manga-container">
        <Link to={`/anime`}>
          <button
            className="read-btn"
            // onClick={() => {
            //   setShowMore(false);
            // }}
          >
            back to anime home
          </button>
        </Link>

        {singleAnime && (
          <article key={mal_id} className="single-manga">
            <img
              style={{ maxWidth: "50%" }}
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
                AIRED : <span> {aired.string}</span>
              </h4>
              {source && (
                <h4>
                  SOURCE : <span> {source}</span>
                </h4>
              )}
              {episodes && (
                <h4>
                  EPISODES : <span>{episodes}</span>
                </h4>
              )}
              {duration && (
                <h4>
                  DURATION : <span>{duration}</span>
                </h4>
              )}
              {season && (
                <h4>
                  SEASON : <span>{season}</span>
                </h4>
              )}
              {year && (
                <h4>
                  YEAR : <span>{year}</span>
                </h4>
              )}
              <h4>
                GENRES :
                {genres.map((a, index) => {
                  return <span key={index}> {a.name},</span>;
                })}
              </h4>
              {producers.length >= 1 && (
                <h4>
                  PRODUCERS :<span>{producers[0].name}</span>
                </h4>
              )}
              {studios.length >= 1 && (
                <h4>
                  STUDIOS :<span>{studios[0].name}</span>
                </h4>
              )}
              <h4>
                SYNOPSIS :<span> {synopsis}</span>
              </h4>
            </section>
            <div className="bookmark" onClick={() => markAnime(singleAnime)}>
              {alreadyExists ? <HiBookmark /> : <HiOutlineBookmark />}
            </div>
          </article>
        )}

        {recomData && (
          <section>
            <h1>Recommended</h1>
            <RecommendedAnime id={mal_id} recomData={recomData} />
          </section>
        )}
      </main>
    );
  }
};

export default SingleAnime;
