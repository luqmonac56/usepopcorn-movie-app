import React from "react";
import { useState } from "react";
import Movie from "./Movie";

export default function MoviesList({ movies, tempMovieData }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
