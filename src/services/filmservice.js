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

export async function fetchPopularMovies(page = 1) {
	const data = await tmdbFetch(`/movie/popular?page=${page}`);
	return data.results;
}

export async function fetchTopRatedMovies() {
	const data = await tmdbFetch("/movie/top_rated");
	return data.results;
}

export async function fetchMovieDetails(movieId) {
	const data = await tmdbFetch(
		`/movie/${movieId}?append_to_response=credits,videos,images`,
	);
	return data;
}

export async function searchMovies(query, page = 1) {
	const data = await tmdbFetch(`/search/movie?query=${query}&page=${page}`);
	return data;
}

export async function searchSimiliarMovies(movieId) {
	const data = await tmdbFetch(`/movie/${movieId}/similar?page=1`);
	return data.results;
}

export async function searchRecommendations(movieId, page = 1) {
	const data = await tmdbFetch(
		`/movie/${movieId}/recommendations?page=${page}`,
	);
	return data;
}

export async function fetchGenres() {
	const data = await tmdbFetch("/genre/movie/list");
	return data.genres;
}

export async function fetchMoviesByGenre(genreId) {
	const data = await tmdbFetch(`/discover/movie?with_genres=${genreId}`);
	return data.results;
}

export function getImageUrl(size = "original", posterPath) {
	if (!posterPath) {
		return "https://placehold.co/400x600?text=Resim+Bulunamadı";
	}
	return `${imgBaseUrl}/${size}${posterPath}`;
}

export async function fetchUpcomingMovies() {
	const date = new Date();
	const formattedDate = `${date.getFullYear()}-${String(
		date.getMonth() + 1,
	).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

	const data = await tmdbFetch(
		`/discover/movie?primary_release_date.gte=${formattedDate}&sort_by=popularity.desc&with_genres=28%7C12%7C35`,
	);
	return data.results;
}

export async function discoverMovie(params) {
	///discover/movie?primary_release_year=2026&sort_by=popularity.desc&vote_average.gte=7&with_genres=28

	const data = await tmdbFetch(`/discover/movie?${params}`);
	return data;
}
