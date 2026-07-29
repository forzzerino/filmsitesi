import "./App.css";
import { MoviesProvider } from "./context/MoviesContext";
import { Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import TrendingMovies from "./views/TrendingMoviesView";
import SearchResultsView from "./views/SearchResultsView";

function App() {
	return (
		<MoviesProvider>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index={true} element={<Home />} />
					<Route path="movies/:id" element={<MovieDetails />} />
					<Route
						path="movies/search"
						element={<SearchResultsView />}
					/>
					<Route
						path="movies/trending"
						element={<TrendingMovies />}
					/>
					<Route path="movies/popular" element={<TrendingMovies />} />
					<Route
						path="movies/top-rated"
						element={<TrendingMovies />}
					/>
					<Route
						path="movies/upcoming"
						element={<TrendingMovies />}
					/>
					<Route
						path="movies/now-playing"
						element={<TrendingMovies />}
					/>
				</Route>
			</Routes>
		</MoviesProvider>
	);
}

export default App;
