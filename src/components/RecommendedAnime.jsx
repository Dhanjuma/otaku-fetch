import React from "react";
import { Link } from "react-router-dom";

const RecommendedAnime = ({ recomData }) => {
  // const [picked, setPicked] = React.useState();
  // const [loading, setLoading] = React.useState(false);

  // console.log(recomData);
  if (recomData) {
    return (
      <main className="recommended-manga-container">
        {recomData
          .filter((item, index) => index < 10)
          .map((anime) => {
            const { mal_id, title, images } = anime.entry;

            return (
              <article key={mal_id} className="recommended-manga">
                <img
                  style={{ width: "60%" }}
                  src={images.jpg.large_image_url}
                  alt=""
                />
                <section>
                  <h4>{title}</h4>
                </section>

                <Link to={`/anime/${mal_id}`}>
                  <button className="more-btn">more</button>
                </Link>
              </article>
            );
          })}
      </main>
    );
  }
  // if (loading) {
  //   return <Loading />;
  // }
};

export default RecommendedAnime;

// const getMultipleRandom = (arr, num) => {
//   const shuffled = [...arr].sort(() => 0.5 - Math.random());

//   return shuffled.slice(0, num);
// };

// function shuffle(a) {
//   let arr = [];

//   for (let i = 0; i < 10; i++) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [a[i], a[j]] = [a[j], a[i]];
//     arr.push(a[j]);
//   }
//   return arr;
// }
