const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";
const imgBaseUrl = "https://image.tmdb.org/t/p";

async function tmdbFetch(endpoint) {
	const url = `${baseUrl}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${apiKey}&language=tr-TR`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`TMDB Api hatası var:${response.status}`);
	}
	return response.json();
}

export async function fetchTrendingMovies() {
	const data = await tmdbFetch("/trending/movie/week");
	return data.results;
}

export async function fetchPopularMovies() {
	const data = await tmdbFetch("/movie/popular");
	return data.results;
}

export async function fetchGenres() {
	const data = await tmdbFetch("/genre/movie/list");
	return data.genres;
}

export async function fetchTopRatedMovies() {
	const data = await tmdbFetch("/movie/top_rated");
	return data.results;
}

export async function fetchMoviesByGenre(genreId) {
	const data = await tmdbFetch(`/discover/movie?with_genres=${genreId}`);
	return data.results;
}

export async function fetchMovieDetails(movieId) {
	const data = await tmdbFetch(
		`/movie/${movieId}?append_to_response=credits,videos,images`,
	);
	return data;
}

export async function searchMovies(query) {
	const data = await tmdbFetch(`/search/movie?query=${query}`);
	return data.results;
}

export function getImageUrl(size = "original", posterPath) {
	if (!posterPath) {
		return "https://placehold.co/400x600?text=Resim+Bulunamadı";
	}
	return `${imgBaseUrl}/${size}${posterPath}`;
}
