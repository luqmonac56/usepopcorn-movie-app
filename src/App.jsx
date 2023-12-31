import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Box from "./components/Box";
// import WatchedBox from "./components/WatchedBox";
import MainContainer from "./components/MainContainer";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import MovieList from "./components/MovieList";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

export default function App() {
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

  const KEY = "ab273a71";
  const query = "wedding";
  const URL = `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`;

  const [watched, setWatched] = useState(tempWatchedData);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(function () {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const res = await fetch(URL);

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies");
        }
        const data = await res.json();
        if (data.response === "False") {
          throw new Error("movie not found")
        }
        setMovies(data.Search);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <Nav>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </Nav>

      <MainContainer>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !errorMessage && <MovieList movies={movies} />}
          {errorMessage && <ErrorMessage msg={errorMessage} />}
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </MainContainer>
    </>
  );
}
