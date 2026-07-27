import { useMovies } from "../context/MoviesContext";
import { Link } from "react-router";
import MovieCategories from "./MovieCategories";
import Hero from "./Hero";

export default function Home() {
	const {
		loading,
		error,
		popularMovies,
		trendingMovies,
		topRatedMovies,
		genres,
	} = useMovies();

	const randomNumber = Math.floor(Math.random() * 20) + 1;

	if (loading) return <div>Yükleniyor...</div>;
	if (error) return <div>Hata: {error.message}</div>;
	return (
		<>
			<Hero movie={trendingMovies[randomNumber]} genres={genres} />
			<MovieCategories
				id="trendingMovies"
				title={"Trending"}
				desc="Bu haftaki trend filmler, sizin için seçtik."
				movies={trendingMovies}
				loading={loading}
				error={error}
			/>

			<MovieCategories
				id="popularMovies"
				title={"Popüler Filmler"}
				desc="Bir de popüler filmlere göz atın."
				movies={popularMovies}
				loading={loading}
				error={error}
			/>

			<MovieCategories
				id="topRatedMovies"
				title={"En Çok Oy Alanlar"}
				desc="En çok oy almış filmler"
				movies={topRatedMovies}
				loading={loading}
				error={error}
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
