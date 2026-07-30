import { useMovies } from "../context/MoviesContext";
import { Link } from "react-router";
import MovieCategories from "../components/MovieCategories";
import Hero from "../components/Hero";
import TopRated from "../components/TopRated";
import ErrorView from "./ErrorView";
import LoadingView from "./LoadingView";
import Genres from "../components/Genres";
export default function HomeView() {
	const {
		loading,
		error,
		popularMovies,
		trendingMovies,
		topRatedMovies,
		genres,
	} = useMovies();

	const randomNumber = Math.floor(Math.random() * 20) + 1;

	if (loading) return <LoadingView />;
	if (error) return <ErrorView error={error.message} />;
	return (
		<>
			<Hero movie={trendingMovies[randomNumber]} genres={genres} />
			<Genres genres={genres} />
			<MovieCategories
				id="trendingMovies"
				title={"Trending"}
				desc="Bu haftaki trend filmler, sizin için seçtik."
				movies={trendingMovies}
				loading={loading}
				error={error}
				route={"/movies/trending"}
				limit={5}
			/>

			<TopRated
				id="topRatedMovies"
				movies={topRatedMovies}
				title={"En çok oy almışlar"}
				desc={"En çok oy almış filmler."}
			/>
			<MovieCategories
				id="popularMovies"
				title={"Popüler Filmler"}
				desc="Bir de popüler filmlere göz atın."
				movies={popularMovies}
				loading={loading}
				error={error}
				route={"/movies/popular"}
				limit={5}
			/>
			{/* <div id="genres" className="mt-6">
				<p className="font-bold text-2xl pb-2">genres</p>
				<div className="grid grid-cols-4"> 
					{genres?.map((genre) => (
						<div key={genre.id} className="border">
							<Link
								to={`/movies/${genre.id}`}
								className="grid grid-cols-7"
							>
								<p className="col-span-2">{genre.id}</p>
								<p className="col-span-5">{genre.name}</p>
							</Link>
						</div>
					))}
				</div>
			</div> */}
		</>
	);
}
