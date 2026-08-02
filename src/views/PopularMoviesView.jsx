import { useEffect, useState } from "react";
import ErrorView from "./ErrorView";
import MovieCategories from "../components/MovieCategories";
import LoadingView from "./LoadingView";
import { useMovies } from "../context/MoviesContext";
export default function PopularMoviesView() {
	const { popularMovies } = useMovies();
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	useEffect(() => {
		setLoading(true);
		setMovies(popularMovies);
		setLoading(false);
	}, [popularMovies]);

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
						id={popularMovies}
						title={"Popüler filmler."}
						desc={"Bu ara çok izleniyorlar."}
						movies={movies}
						loading={loading}
						error={error}
						route={null}
						limit={null}
					/>
				</div>
			)}
		</>
	);
}
