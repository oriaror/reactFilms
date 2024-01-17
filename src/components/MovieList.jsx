import { useEffect, useState } from "react";
import Modal from "./Modal";
import useIntersectionObserver from "./useIntersectionObserver";
import MovieCard from "./MovieCard";
import "./films.css";
import { createPortal } from "react-dom";

const MovieList = () => {
  const [title, setTitle] = useState("");
  const [tempTitle, setTempTitle] = useState("");
  const [isIntersecting, elementRef] = useIntersectionObserver();
  const [currentPage, setCurrentPage] = useState(2);
  const [movie, setMovie] = useState([]);
  const [filter, setFilter] = useState("");
  const [tempFilter, setTempFilter] = useState("");
  const [current, setCurrent] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const url =
    "http://www.omdbapi.com?" +
    new URLSearchParams({
      s: title,
      apikey: "3b03ff57",
      page: currentPage,
      type: filter,
    });

  const fetchData = async function (url) {
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === "True") {
      setMovie([...movie, ...data.Search]);
      setCurrentPage((prevPage) => prevPage + 1);
    } else return;
  };

  useEffect(() => {
    if (isIntersecting) {
      fetchData(url);
    }
  }, [isIntersecting, currentPage]);

  const handleOnClick = () => {
    if (title === tempTitle && filter === tempFilter) {
      return;
    } else
      fetch(`http://www.omdbapi.com/?s=${title}&apikey=3b03ff57&type=${filter}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.Search) {
            setTempTitle(title);
            setTempFilter(filter);
            setMovie(
              (prev) => prev.slice(0, prev.length),
              setMovie(data.Search)
            );
          } else {
            setTempTitle(title);
            setTempFilter(filter);
            setMovie(["Nothing Found"]);
          }
        });
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
    setCurrentPage((prev) => (prev = 2));
  };

  return (
    <>
      <div className="center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="btn"
          onClick={handleOnClick}
          style={{
            position: "relative",
          }}
        >
          Search
        </button>

        <form className="filters">
          <p>
            <label>
              <input
                className="with-gap"
                name="filter"
                type="radio"
                value={""}
                onChange={handleFilter}
                defaultChecked
              />
              <span>All</span>
            </label>
          </p>
          <p>
            <label>
              <input
                className="with-gap"
                name="filter"
                type="radio"
                value={"movie"}
                onChange={handleFilter}
              />
              <span>Movie</span>
            </label>
          </p>
          <p>
            <label>
              <input
                className="with-gap"
                name="filter"
                type="radio"
                value={"series"}
                onChange={handleFilter}
              />
              <span>Series</span>
            </label>
          </p>
        </form>
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
    </>
  );
};

export default MovieList;
