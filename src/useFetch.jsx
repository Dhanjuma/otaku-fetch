import React from "react";
export const useFetch = (url) => {
  const [detail, setDetail] = React.useState([]);
  // const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetch = async () => {
      // setLoading(false);
      const res = await fetch(url);
      const data = await res.json();
      setDetail(data.data);
      // setLoading(true);
    };

    fetch();
  }, [url]);
  return { detail };
};
