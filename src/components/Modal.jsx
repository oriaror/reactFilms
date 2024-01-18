import { useEffect, useState } from "react";
import "../styles/modal.css";
const Modal = ({ props, setModalShow }) => {
  const [plot, setPlot] = useState("");
  const [poster, setPoster] = useState("");
  const [rating, setRating] = useState("");

  const fetchFull = async function () {
    const res = await fetch(
      `http://www.omdbapi.com/?i=${props}&apikey=3b03ff57`
    );
    const data = await res.json();
    setPlot(data.Plot);
    setPoster(data.Poster);
    setRating(data.imdbRating);
  };

  useEffect(() => {
    fetchFull();
  }, []);

  return (
    <div className="portal">
      <div className="back" onClick={setModalShow}></div>
      <div className="modals">
        <img src={poster} alt="" className="img" />
        <p className="info">{plot}</p>
        <p>{rating}</p>
      </div>
    </div>
  );
};

export default Modal;
