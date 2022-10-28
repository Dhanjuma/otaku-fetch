import React from "react";

const Bookmarks = () => {
  const [genre, setGenre] = React.useState();

  // const fetch = React.useCallback(async () => {
  //   const res = await fetch("https://api.jikan.moe/v4/genres/manga");
  //   const data = await res.json();
  //   console.log(data);
  // }, []);

  React.useEffect(() => {
    fetch(`https://api.jikan.moe/v4/genres/manga`)
      .then((response) => {
        return response.json();
      })
      .then((myJson) => {
        setGenre(myJson.data);
      });
  }, []);

  // React.useEffect(() => {
  //   fetch();
  // }, []);

  console.log(genre);
  return <div>Bookmarks</div>;
};

export default Bookmarks;
