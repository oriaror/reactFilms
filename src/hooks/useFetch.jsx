import { useEffect, useState } from "react";

const useFetch = (url, setCurrentPage, isIntersecting) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const clearData = () => {
    setTimeout(setCurrentPage(1), 0);
    setTimeout(
      setData((prev) => prev.splice(0, prev.length)),
      1000
    );
  };

  const handleOnClick = async function () {
    try {
      setLoading(true);
      const res = await fetch(url);
      const result = await res.json();
      setResponse(result.Response);
      setData([...data, ...result.Search]);
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isIntersecting && response === "True") {
      handleOnClick();
    }
  }, [isIntersecting, url, response]);

  return [data, error, loading, handleOnClick, clearData];
};

export default useFetch;
