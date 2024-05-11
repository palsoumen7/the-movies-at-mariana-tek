import moviesData from "../moviesData.json";

export function populateGenreOptions() {
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
}
