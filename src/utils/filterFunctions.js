export function filterMoviesByGenre(movie, selectedGenres) {
    if (selectedGenres.length === 0) {
        return true;
    }
    return selectedGenres.every((genre) => movie.genre.includes(genre.value));
}

export function searchMoviesByTitle(movie, searchTerm) {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
}
