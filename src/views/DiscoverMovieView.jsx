import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { discoverMovie } from "../services/filmservice";
import LoadingView from "./LoadingView";
import ErrorView from "./ErrorView";
import DiscoverMovies from "../components/DiscoverMovies";
import Pagination from "../components/Pagination";
import DiscoverFilters from "../components/DiscoverFilters";

export default function DiscoverMovieView() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [movies, setMovies] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const [totalPages, setTotalPages] = useState(0);
	const [totalResults, setTotalResults] = useState(0);
	const page = searchParams.get("page") || 1;

	useEffect(() => {
		async function getDiscoverMovies() {
			try {
				setLoading(true);

				const data = await discoverMovie(searchParams.toString());
				setTotalPages(data.total_pages);
				setTotalResults(data.total_results);
				setMovies(data.results);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		}
		getDiscoverMovies();
	}, [searchParams]);
	if (loading) {
		return <LoadingView />;
	}
	if (error) {
		return <ErrorView message={error} />;
	}
	return (
		<div className="max-w-350 my-12 mx-auto px-4 lg:px-0">
			<div className="flex justify-between items-center">
				<div className="title mb-3">
					<div className="font-bold text-3xl">Filmleri Keşfet</div>
					<div className="font-medium text-lg">
						{totalResults} film bulundu.
					</div>
				</div>
				<DiscoverFilters
					searchParams={searchParams}
					setSearchParams={setSearchParams}
				/>
			</div>

			<DiscoverMovies
				id={"discoverMovies"}
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
	);
}
