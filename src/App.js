import React, { useState } from "react";
import Select from "react-select";
import "./App.css";
import moviesData from "./moviesData.json";

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

function App() {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const filterMoviesByGenre = (movie) => {
        if (selectedGenres.length === 0) {
            return true;
        }
        return selectedGenres.every((genre) => movie.genre.includes(genre.value));
    };

    const searchMoviesByTitle = (movie) => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    };

    const filteredMovies = moviesData
        .flatMap((event) => event.movies)
        .filter(filterMoviesByGenre)
        .filter((movie) => searchTerm === '' || searchMoviesByTitle(movie));

    const populateGenreOptions = () => {
        const genres = ["All"];
        moviesData.forEach((event) => {
            event.movies.forEach((movie) => {
                movie.genre.forEach((genre) => {
                    if (!genres.includes(genre)) {
                        genres.push(genre);
                    }
                });
            });
        });
        return genres.map((genre) => ({ value: genre, label: genre }));
    };

    return (
        <div className="App">
            <h3>Movie Night Mariana Tek</h3>
            <div className="filter-container">
                <label htmlFor="genre-filter">Genre:</label>
                <div className="genre-select-container">
                    <Select
                        className="genre-select"
                        id="genre-filter"
                        options={populateGenreOptions()}
                        isMulti
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                width: "200px"
                            }),
                            menu: (provided) => ({
                                ...provided,
                                backgroundColor: "black",
                                color: "white"
                            }),
                        }}
                        onChange={(selectedOptions) => setSelectedGenres(selectedOptions)}
                    />
                </div>
                <input
                    className="title-search"
                    type="text"
                    id="title-search"
                    placeholder="Search by Title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ height: "35px", borderRadius: "5px" }}
                />
            </div>
            <MovieList movies={filteredMovies} />
        </div>
    );
}

export default App;
