import { useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar />
        <SearchBarResult movies={movies} />
      </NavBar>

      <Main>
        
        <Box>
          <MovieList movies={movies} />
        </Box>

        <Box>
          <WatchedMovieSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

////////////////// right container .//////////////////

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
}

function WatchedMovieSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <InfoCard icon="️#️⃣" data={`${watched.length} movies`} />
        <InfoCard icon="⭐️" data={avgImdbRating} />
        <InfoCard icon="🌟" data={avgUserRating} />
        <InfoCard icon="⏳" data={avgRuntime} />
      </div>
    </div>
  );
}

function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie, i) => (
        <WatchMovieCard movie={movie} key={i} />
      ))}
    </ul>
  );
}

function WatchMovieCard({ movie }) {
  return (
    <li key={movie.imdbID}>
      <PosterAndTitle movie={movie} />
      <div>
        <InfoCard icon="⭐️" data={movie.imdbRating} />
        <InfoCard icon="🌟" data={movie.userRating} />
        <InfoCard icon="⏳" data={`${movie.runtime} min`} />
      </div>
    </li>
  );
}

function PosterAndTitle({ movie }) {
  return (
    <>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
    </>
  );
}

/////////////////// left container////////////////

function InfoCard({ icon, data }) {
  return (
    <p>
      <span>{icon}</span>
      <span>{data}</span>
    </p>
  );
}

function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie, i) => (
        <MovieCard movie={movie} key={i} />
      ))}
    </ul>
  );
}

function MovieCard({ movie }) {
  return (
    <li key={movie.imdbID}>
      <PosterAndTitle movie={movie} />
      <div>
        <InfoCard icon="🗓" data={movie.Year} />
      </div>
    </li>
  );
}

function ToggleButton({ isOpen, setIsOpen }) {
  return (
    <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
      {isOpen ? "–" : "+"}
    </button>
  );
}

/////////// NAVBAR ??????????????????
function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function SearchBar() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function SearchBarResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
