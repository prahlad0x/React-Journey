import { useEffect, useState } from "react";

export function useMovie(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (query.length < 3) {
        setIsError(null);
        return;
      }

      try {
        setIsError("");
        setIsLoading(true);
        const response = await fetch(
          `https://www.omdbapi.com/?apiKey=7d45514e&s=${query}`
        );
        const data = await response.json();

        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setMovies(data?.Search || []);
      } catch (error) {
        console.log(error.message);
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    const id = setTimeout(fetchData, 1000);
    return () => clearTimeout(id);
  }, [query]);

  return { isLoading, movies, isError };
}
