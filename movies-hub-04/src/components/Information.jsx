function PosterAndTitle({ movie, onAddSelected }) {
  function handleAddSelected() {
    if (!onAddSelected) return;
    onAddSelected(movie.imdbId);
  }

  return (
    <>
      <img src={movie.poster || movie.Poster} alt={`Movie poster`} />
      <h3 role="button" onClick={handleAddSelected}>
        {movie.title || movie.Title}
      </h3>
    </>
  );
}

function InfoMessage({ className, message }) {
  return <p className={className}> {message}</p>;
}

function InfoCard({ icon, data }) {
  return (
    <p>
      <span>{icon}</span>
      <span>{data}</span>
    </p>
  );
}

export { InfoCard, InfoMessage, PosterAndTitle };
