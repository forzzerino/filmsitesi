import "./App.css";
import { MoviesProvider } from "./context/MoviesContext";
import { Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomeView from "./views/HomeView";
import MovieDetails from "./components/MovieDetails";
import TrendingMovies from "./views/TrendingMoviesView";
import SearchResultsView from "./views/SearchResultsView";
import PopularMoviesView from "./views/PopularMoviesView";
import MovieRecommendationsView from "./views/MovieRecommendationsView";

function App() {
	return (
		<MoviesProvider>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index={true} element={<HomeView />} />
					<Route path="movies/:id" element={<MovieDetails />} />
					<Route
						path="movies/search"
						element={<SearchResultsView />}
					/>
					<Route
						path="movies/trending"
						element={<TrendingMovies />}
					/>
					<Route
						path="movies/popular"
						element={<PopularMoviesView />}
					/>
					<Route
						path="movies/:id/recommendations"
						element={<MovieRecommendationsView />}
					/>
				</Route>
			</Routes>
		</MoviesProvider>
	);
}

export default App;
