import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { searchMovies } from "../services/filmservice";
import ErrorView from "./ErrorView";
import MovieCategories from "../components/MovieCategories";
import LoadingView from "./LoadingView";
import Pagination from "../components/Pagination";
export default function SearchResultsView() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState([]);
	const [error, setError] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const [totalPages, setTotalPages] = useState(0);
	const [totalResults, setTotalResults] = useState(0);

	const query = searchParams.get("query");
	const page = searchParams.get("page") || 1;

	useEffect(() => {
		async function getMovies() {
			try {
				setLoading(true);
				const response = await searchMovies(query, page);
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
				<div className="max-w-350 my-6 md:my-12 mx-auto px-4 lg:px-0">
					<MovieCategories
						id={query}
						title={query + " için bulunan sonuçlar"}
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
						query={query}
					/>
				</div>
			)}
		</>
	);
}
