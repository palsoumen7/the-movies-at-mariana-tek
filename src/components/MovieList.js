import React from "react";
import "../styles/MovieList.css";

function MovieList({ movies }) {
    return (
        <div id="movie-list">
            {movies.map((movie, index) => (
                <div key={index} className="movie">
                    <h2>{movie?.title}</h2>
                    <img
                        style={{ width: "50px", height: "50px" }}
                        src={movie?.poster}
                        alt={movie?.title}
                    />
                    <p className="movie-detail">Genre: {movie?.genre.join(", ")}</p>
                    <p className="movie-detail">Rating: {movie?.rated}</p>
                    <p className="movie-detail">Year Release: {movie?.year}</p>
                    <p className="movie-detail">
                        Metacritic Rating:{" "}
                        {movie?.ratings && movie?.ratings.find((rating) => rating?.source === "Metacritic")?.value}
                    </p>
                    <p className="movie-detail">Runtime: {movie?.runtime}</p>
                </div>
            ))}
        </div>
    );
}

export default MovieList;
