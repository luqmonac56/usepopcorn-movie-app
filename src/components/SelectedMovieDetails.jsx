import React, { useEffect, useState } from "react";
// import StarRating from "";
import StarRating from "./StarRating";

export default function SelectedMovieDetails({
  selectedID,
  onCloseMovieDetail,
  KEY,
}) {
  const [movieDetails, setMovieDetails] = useState({});
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Plot: plot,
  } = movieDetails;

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
          );
          const data = await res.json();
          setMovieDetails(data);
        } catch (err) {}
      }

      getMovieDetails();
    },
    [selectedID]
  );

  console.log(title, released);

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovieDetail}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${movieDetails} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          <StarRating maxRating={10} size={24} />
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Staring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}
