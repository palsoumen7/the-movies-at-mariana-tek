import React, { useState } from "react";
import Select from "react-select";
import "../styles/HomePage.css";
import moviesData from "../moviesData.json";
import MovieList from "../components/MovieList";
import { filterMoviesByGenre, searchMoviesByTitle } from "../utils/filterFunctions";
import { populateGenreOptions } from "../utils/populateOptions";

function HomePage() {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredMovies = moviesData
        .flatMap((event) => event.movies)
        .filter((movie) => filterMoviesByGenre(movie, selectedGenres))
        .filter((movie) => searchTerm === '' || searchMoviesByTitle(movie, searchTerm));

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

export default HomePage;
