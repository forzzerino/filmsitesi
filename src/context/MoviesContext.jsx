import { createContext, useEffect, useState, useContext, useMemo } from "react";
import {
	fetchTrendingMovies,
	fetchPopularMovies,
	fetchGenres,
	fetchTopRatedMovies,
	fetchUpcomingMovies,
} from "../services/filmservice";

const MoviesContext = createContext();

export const useMovies = () => {
	const context = useContext(MoviesContext);

	if (context === undefined) {
		throw new Error("useMovies'i Provider içinde kullan.");
	}
	return context;
};

export const MoviesProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [trendingMovies, setTrendingMovies] = useState([]);
	const [popularMovies, setPopularMovies] = useState([]);
	const [topRatedMovies, setTopRatedMovies] = useState([]);
	const [upcomingMovies, setUpcomingMovies] = useState([]);
	const [genres, setGenres] = useState([]);

	useEffect(() => {
		async function loadMovies() {
			try {
				setLoading(true);
				const [
					trendingMovies,
					popularMovies,
					topRatedMovies,
					upcomingMovies,
					genres,
				] = await Promise.all([
					fetchTrendingMovies(),
					fetchPopularMovies(),
					fetchTopRatedMovies(),
					fetchUpcomingMovies(),
					fetchGenres(),
				]);
				setTrendingMovies(trendingMovies);
				setPopularMovies(popularMovies);
				setTopRatedMovies(topRatedMovies);
				setUpcomingMovies(upcomingMovies);
				setGenres(genres);
			} catch (error) {
				setError(error);
				console.log("filmler yüklenirken error oldu", error);
			} finally {
				setLoading(false);
			}
		}
		loadMovies();
	}, []);

	const value = useMemo(
		() => ({
			trendingMovies,
			popularMovies,
			topRatedMovies,
			upcomingMovies,
			genres,
			error,
			loading,
		}),
		[
			trendingMovies,
			popularMovies,
			topRatedMovies,
			upcomingMovies,
			genres,
			error,
			loading,
		],
	);

	return (
		<MoviesContext.Provider value={value}>
			{children}
		</MoviesContext.Provider>
	);
};
