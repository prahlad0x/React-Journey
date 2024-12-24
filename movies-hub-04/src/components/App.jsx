import { useState } from "react";
import ToggleButton from "./Button";
import { WatchedMovieList, WatchedMovieSummary } from "./WatchedMovie";
import { MovieDetails, MovieList } from "./Movie";
import { Logo, NavBar, SearchBar, SearchBarResult } from "./Navbar";
import { InfoMessage } from "./Information";
import { useMovie } from "./useMovie";
import { useLocalStorage } from "./useLocalStorage";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");

  const { movies, isError, isLoading } = useMovie(searchQuery);

  const [watched, setWatched] = useLocalStorage([], "userWatchedMovies");

  function handleSearchInput(data) {
    setSearchQuery(data);
    handleRemoveSelectMovie();
  }

  function handleSelectMovie(id) {
    if (!id) return;
    setSelectedMovie((a) => (a === id ? null : id));
  }

  function handleRemoveFromWatched(id) {
    if (!id) return;
    setWatched((movies) => movies.filter((el) => el.imdbId !== id));
    setSelectedMovie(null);
  }

  function handleRemoveSelectMovie() {
    setSelectedMovie(null);
  }

  function handleAddWatched(movie) {
    setWatched((data) => [
      ...data.filter((el) => el.imdbId !== movie.imdbId),
      movie,
    ]);
    setSelectedMovie(null);
  }

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar searchData={searchQuery} onSearchQuery={handleSearchInput} />
        <SearchBarResult movies={movies} />
      </NavBar>

      <Main>
        <Box hide={isLoading || isError}>
          {isLoading && <InfoMessage className="loader" message="LOADING..." />}
          {!isLoading && isError && (
            <InfoMessage className="error" message={isError} />
          )}
          {!isLoading &&
            !isError &&
            (movies.length > 0 ? (
              <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
            ) : (
              <InfoMessage className="error" message="Search for movies." />
            ))}
        </Box>

        <Box>
          {selectedMovie ? (
            <MovieDetails
              selectedId={selectedMovie}
              onRemoveSelectedId={handleRemoveSelectMovie}
              key={selectedMovie}
              onAddWatched={handleAddWatched}
              onRemoveWatched={handleRemoveFromWatched}
              watchedMovies={watched}
            />
          ) : (
            <>
              <WatchedMovieSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onSelectMovie={handleSelectMovie}
                onRemoveWatched={handleRemoveFromWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children, hide }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      {!hide && <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />}
      {isOpen && children}
    </div>
  );
}
