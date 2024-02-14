import { useState } from "react";
import Modal from "./Modal";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import MovieCard from "./MovieCard";
import Filter from "./Filter";
import SearchBar from "./SearchBar";
import "../styles/films.css";
import { createPortal } from "react-dom";
import useFetch from "../hooks/useFetch";

const MovieList = () => {
  const [title, setTitle] = useState("");
  const [isIntersecting, elementRef] = useIntersectionObserver();
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [current, setCurrent] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const url =
    "https://www.omdbapi.com?" +
    new URLSearchParams({
      s: title,
      apikey: "3b03ff57",
      page: currentPage,
      type: filter,
    });

  // const [url] = useUrl(title, filter, currentPage);
  const [movie, error, loading, fetchPosts, clearData] = useFetch(
    url,
    setCurrentPage,
    isIntersecting
  );

  return (
    <div className="center">
      <SearchBar
        handleOnClick={fetchPosts}
        clearData={clearData}
        setCurrentPage={setCurrentPage}
        title={title}
        setTitle={setTitle}
      />
      <Filter setFilter={setFilter} setCurrentPage={setCurrentPage} />
      {modalShow
        ? createPortal(
            <Modal
              props={current}
              setModalShow={() => {
                return (
                  setModalShow(false), (document.body.style.overflow = "auto")
                );
              }}
            />,
            document.body
          )
        : null}
      <div className="films">
        {movie[0] === "Nothing Found" ? (
          <p>Nothing Found</p>
        ) : movie && movie.length !== 0 ? (
          movie.map((film) => (
            <MovieCard
              props={film}
              key={film.imdbID}
              onClick={() => {
                setCurrent(film.imdbID);
                setModalShow(true);
                document.body.style.overflow = "hidden";
              }}
            />
          ))
        ) : (
          <p>Enter movie title</p>
        )}
        {movie.length > 0 ? <div ref={elementRef}></div> : null}
      </div>
    </div>
  );
};

export default MovieList;
