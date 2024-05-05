import React from "react";
import { useState } from "react";
import Movie from "./Movie";

export default function MoviesList({ movies, handleSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          handleSelectMovie={handleSelectMovie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
