import { InfoCard, PosterAndTitle } from "./Information";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function WatchedMovieSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating)) || 0;
  const avgUserRating = average(watched.map((movie) => movie.userRating)) || 0;
  const avgRuntime = average(watched.map((movie) => movie.runtime)) || 0;

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <InfoCard icon="️#️⃣" data={`${watched.length} movies`} />
        <InfoCard icon="⭐️" data={+avgImdbRating.toFixed(1)} />
        <InfoCard icon="🌟" data={+avgUserRating.toFixed(1)} />
        <InfoCard icon="⏳" data={+avgRuntime.toFixed(1)} />
      </div>
    </div>
  );
}

function WatchedMovieList({ watched, onSelectMovie, onRemoveWatched }) {
  return (
    <ul className="list">
      {watched.map((movie, i) => (
        <WatchMovieCard
          movie={movie}
          key={i}
          onSelectMovie={onSelectMovie}
          onRemoveWatched={onRemoveWatched}
        />
      ))}
    </ul>
  );
}

function WatchMovieCard({ movie, onSelectMovie, onRemoveWatched }) {
  return (
    <li key={movie.imdbId}>
      <PosterAndTitle movie={movie} onAddSelected={onSelectMovie} />
      <div>
        <InfoCard icon="⭐️" data={movie.imdbRating} />
        <InfoCard icon="🌟" data={movie.userRating} />
        <InfoCard icon="⏳" data={`${movie.runtime} min`} />
        <button
          className="btn-delete"
          onClick={() => onRemoveWatched(movie.imdbId)}
        >
          X
        </button>
      </div>
    </li>
  );
}

export { WatchMovieCard, WatchedMovieSummary, WatchedMovieList };
