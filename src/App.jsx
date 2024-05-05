import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import NumResults from "./components/NumResults";
import ListBox from "./components/ListBox";
import Box from "./components/Box";
import MoviesList from "./components/MoviesList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import SearchBox from "./components/SearchBox";
import SelectedMovieDetails from "./components/SelectedMovieDetails";

export default function App() {

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

  const KEY = "ab273a71";

  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("inception");
  const [error, setError] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  function handleSelectMovie(id) {
    // setSelectedID(id);
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  }

  function handleCloseDetails() {
    setSelectedID(null);
  }
  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!res.ok) {
            throw new Error("Something went wrong with fetching of movies");
          }
          const data = await res.json();
          console.log(data);
          if (data.Response === "False") {
            throw new Error("Movie not found");
          }
          setMovies(data.Search);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }

      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <SearchBox query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {/* {isLoading ? (
            <Loader />
          ) : (
            <MoviesList tempMovieData={tempMovieData} movies={movies} />
          )} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} handleSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedID ? (
            <SelectedMovieDetails
              onCloseMovieDetail={handleCloseDetails}
              selectedID={selectedID}
              KEY={KEY}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} average={average} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
