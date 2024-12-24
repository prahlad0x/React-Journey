import { useEffect, useRef, useState } from "react";
import { InfoCard, InfoMessage, PosterAndTitle } from "./Information";
import StarRatingCard from "./StarRatingCard";
import { useKey } from "./useKey";

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list">
      {movies?.map((movie, i) => (
        <MovieCard movie={movie} key={i} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function MovieCard({ movie, onSelectMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <PosterAndTitle movie={movie} />
      <div>
        <InfoCard icon="🗓" data={movie.Year} />
      </div>
    </li>
  );
}

function MovieDetails({
  selectedId,
  onRemoveSelectedId,
  onAddWatched,
  watchedMovies,
  onRemoveWatched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState("");
  const [userRating, setUserRating] = useState(0);
  const countRef = useRef(0);

  let isWatched = watchedMovies.find((el) => el.imdbId === selectedId);

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Year: year,
    imdbRating,
  } = movie;

  useKey("escape", onRemoveSelectedId)

  function handleAdd() {
    const newWatchedMovie = {
      imdbId: selectedId,
      title,
      poster,
      runtime: runtime.split(" ")[0],
      year,
      imdbRating: +imdbRating,
      userRating: +userRating,
      countRatingDecision: countRef.current,
    };

    onAddWatched(newWatchedMovie);
  }

  useEffect(() => {
    // fetch movie details
    const getMovieData = async () => {
      try {
        setIsLoading(true);
        setIsLoading(false);
        const response = await fetch(
          `https://www.omdbapi.com/?apiKey=7d45514e&i=${selectedId}`
        );

        const data = await response.json();
        setIsLoading(false);

        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setMovie(data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    };
    getMovieData();
    // const id = setTimeout(() => {
    // }, 1000);

    // return () => clearTimeout(id);
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "userPopcorn";
    };
  }, [title]);

  // useEffect(() => {
  //   function callBack(e) {
  //     if (e.code === "Escape") {
  //       onRemoveSelectedId();
  //     }
  //   }

  //   document.addEventListener("keydown", callBack);

  //   return () => {
  //     document.removeEventListener("keydown", callBack);
  //   };
  // }, [onRemoveSelectedId]);

  useEffect(() => {
    if (userRating) {
      countRef.current++;
    }
  }, [userRating]);

  return (
    <div className="details">
      {isLoading ? (
        <InfoMessage message="LOADING..." className="loader" />
      ) : isError ? (
        <InfoMessage message={isError} className="loader" />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onRemoveSelectedId}>
              &larr;
            </button>

            <img src={poster} alt={`Poster of movie ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched ? (
                <>
                  <p>You rated this movie with {isWatched.userRating}⭐ </p>
                  <button
                    className="btn-add"
                    onClick={() => onRemoveWatched(selectedId)}
                  >
                    Remove from list
                  </button>
                </>
              ) : (
                <>
                  <StarRatingCard
                    size={24}
                    maxRating={10}
                    onSetRating={(r) => setUserRating(r)}
                  />
                  <button className="btn-add" onClick={handleAdd}>
                    Add to list
                  </button>
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>DirectedBy {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export { MovieList, MovieDetails };
