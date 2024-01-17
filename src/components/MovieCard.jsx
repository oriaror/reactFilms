import "./card.css";
const MovieCard = ({ props, onClick }) => {
  const { Title, Poster } = props;

  return (
    <>
      <div className="row">
        <div className="col s12 m7" onClick={onClick}>
          <div className="card">
            <div className="card-image">
              <img
                src={Poster === "N/A" ? "https://placehold.co/350x525" : Poster}
                alt={Title}
              />
              <span className="card-title">{Title}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
