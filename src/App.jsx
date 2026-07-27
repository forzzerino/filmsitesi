import "./App.css";
import { MoviesProvider } from "./context/MoviesContext";
import { Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import TrendingMovies from "./components/TrendingMovies";
function App() {
	return (
		<MoviesProvider>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index={true} element={<Home />} />
					<Route
						path="movies/trending"
						element={<TrendingMovies />}
					/>
					<Route path="movies/:id" element={<MovieDetails />} />
				</Route>
			</Routes>
		</MoviesProvider>
	);
}

export default App;
