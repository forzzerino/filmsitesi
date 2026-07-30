import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import {
	searchRecommendations,
	fetchMovieDetails,
} from "../services/filmservice";
import ErrorView from "./ErrorView";
import MovieCategories from "../components/MovieCategories";
import LoadingView from "./LoadingView";
import Pagination from "../components/Pagination";
export default function MovieRecommendationsView() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState([]);
	const [error, setError] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const [totalPages, setTotalPages] = useState(0);
	const [totalResults, setTotalResults] = useState(0);
	const [query, setQuery] = useState("");
	const [movieName, setMovieName] = useState("");

	const movieId = useParams().id;
	const page = searchParams.get("page") || 1;

	useEffect(() => {
		async function getMovies() {
			try {
				setLoading(true);
				const response = await searchRecommendations(movieId, page);
				const movie = await fetchMovieDetails(movieId);
				if (movie.title) {
					setMovieName(movie.title);
				}
				if (!response.results) {
					throw new Error("Filmler aranamadı");
				}
				if (response.results) {
					setTotalPages(response.total_pages);
					setTotalResults(response.total_results);
					setMovies(response.results);
				}
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}
		getMovies();
	}, [searchParams]);
	if (loading) {
		return <LoadingView />;
	}
	if (error) {
		return <ErrorView error={error.message} />;
	}
	return (
		<>
			{!loading && !error && (
				<div className="">
					<MovieCategories
						id={movieId}
						title={movieName + " ile benzer"}
						desc={"" + totalResults + " film bulundu."}
						movies={movies}
						loading={loading}
						error={error}
						route={null}
						limit={null}
					/>
					<Pagination
						page={page}
						totalPages={totalPages}
						setSearchParams={setSearchParams}
					/>
				</div>
			)}
		</>
	);
}
