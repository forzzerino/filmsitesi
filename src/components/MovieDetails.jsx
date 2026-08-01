import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
	fetchMovieDetails,
	searchSimiliarMovies,
	searchRecommendations,
} from "../services/filmservice";
import { getImageUrl } from "../services/filmservice";
import { useMovies } from "../context/MoviesContext";
import { Link } from "react-router";
import LoadingView from "../views/LoadingView";
import ErrorView from "../views/ErrorView";
import CastCard from "./CastCard";
import Spinner from "./Spinner";
import MovieCard from "./MovieCard";

export default function MovieDetails() {
	const movieId = useParams().id;
	const [movie, setMovie] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { genres } = useMovies();
	const [loaded, setLoaded] = useState(false);
	const [similiarMovies, setSimiliarMovies] = useState([]);
	const [recommendations, setRecommendations] = useState([]);

	useEffect(() => {
		async function loadMovieDetail() {
			try {
				setLoading(true);
				const data = await fetchMovieDetails(movieId);
				const date = data.release_date.substring(0, 4);
				const vote_average = data.vote_average.toFixed(1);
				const backdrop = getImageUrl(
					"original",
					data.backdrop_path || null,
				);
				const poster = getImageUrl("w500", data.poster_path || null);

				const revenue = data.revenue
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
				const budget = data.budget
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
				setMovie({
					...data,
					revenue: revenue,
					budget: budget,
					vote_average: vote_average,
					release_date: date,
					backdrop_path: backdrop,
					poster_path: poster,
				});

				// const similarMovies = await searchSimiliarMovies(movieId);
				// setSimiliarMovies(similarMovies.slice(0, 5));

				const recommendationsMovies =
					await searchRecommendations(movieId);
				setRecommendations(recommendationsMovies.results.slice(0, 5));

				setLoading(false);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}
		loadMovieDetail();
	}, [movieId]);

	function getVoteColor(type = "text", isbgColor = false) {
		if (movie.vote_average >= 7.5)
			return `${type}-green-500 ${isbgColor ? "bg-green-900/90" : ""}`;
		if (movie.vote_average >= 6)
			return `${type}-yellow-500 ${isbgColor ? "bg-yellow-900/90" : ""}`;
		return `${type}-red-500 ${isbgColor ? "bg-red-900/90" : ""}`;
	}

	if (loading) return <LoadingView />;
	if (error) return <ErrorView error={error.message} />;

	return (
		<>
			{console.log(movie)}
			<main id={movie.id}>
				<div className="py-16 md:py-32 relative">
					<div className="grid grid-cols-1 md:grid-cols-3 max-w-350 mx-auto px-4 lg:px-0">
						<div className="">
							<div className="image">
								{!loaded && (
									<div className="w-full md:w-96 h-130 rounded-lg bg-gray-300 flex items-center justify-center">
										<Spinner />
									</div>
								)}
								<img
									src={movie.poster_path}
									alt={movie?.title}
									className="rounded-md w-full md:w-96 shadow-xl"
									onLoad={() => setLoaded(true)}
								/>
							</div>
						</div>
						<div className="col-span-1 md:col-span-2 flex flex-col gap-4 pt-6 md:pt-12">
							{movie.tagline && (
								<p className="font-mono text-gray-400 tracking-tight leading-tight text-lg">
									{movie.tagline}
								</p>
							)}
							{movie.title && (
								<h1
									className={
										"text-4xl sm:text-6xl md:text-8xl font-bold leading-tight md:leading-20 tracking-tighter text-gray-300 "
									}
								>
									{movie.title}
								</h1>
							)}
							<div className="text-gray-300 w-3/4 flex font-mono tracking-tight leading-tight text-lg gap-2 mt-6">
								{/* {movie.genres?.map((genre) => (
								<div key={genre.id} className="">
									<span>{genre.name}</span>
									<span className="text-gray-500 pl-2">
										•
									</span>
								</div>
							))} */}
								{movie.genres && (
									<span>{movie.genres[0]?.name}</span>
								)}
								{movie.genres?.[0]?.name && (
									<span className="text-gray-500">•</span>
								)}
								{movie.release_date && (
									<span>{movie.release_date}</span>
								)}
								<span className="text-gray-500">•</span>
								{movie.runtime && (
									<span>{movie.runtime}dk</span>
								)}
								<span className="text-gray-500">•</span>
								{movie.vote_average && (
									<span
										className={`${getVoteColor("text", true)} px-1.5 tracking-tighte border rounded-sm`}
									>
										{movie.vote_average}
									</span>
								)}
							</div>
							<div className="flex gap-2 w-full md:w-1/2 mt-6">
								<Link className="button-primary flex justify-center items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="lucide lucide-play-icon lucide-play"
									>
										<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
									</svg>
									Fragmanı İzle
								</Link>
								<button className="button-secondary flex justify-center items-center gap-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="lucide lucide-plus-icon lucide-plus"
									>
										<path d="M5 12h14" />
										<path d="M12 5v14" />
									</svg>
									Liste'ye ekle
								</button>
							</div>
							{movie.overview && (
								<p className="font-mono text-lg tracking-tight leading-tight text-gray-400 mt-6">
									{movie.overview}
								</p>
							)}
						</div>
					</div>
					<div className="absolute top-0 left-0 -z-50 overflow-hidden w-full h-full">
						<img
							src={movie.backdrop_path}
							alt={movie?.title}
							className="w-full h-full object-cover scale-101"
						/>
						<div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
					</div>
				</div>
				<section className="max-w-350 my-12 mx-auto flex flex-col gap-16 pb-8 px-4 lg:px-0">
					<div className="details grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
						<div className="grid-cols-1">
							<div className="title mb-3">
								<div className="font-bold text-3xl">
									Detaylar
								</div>
							</div>
							<div className="">
								<div className="py-2 border-b border-b-border">
									<p className="uppercase font-semibold text-neutral-500">
										Yapım Şirketleri
									</p>
									<p className="text-pretty font-mono tracking-tighter">
										{movie?.production_companies?.map(
											(c, index, array) => (
												<span key={index}>
													{c.name}
													{index !=
														array.length - 1 &&
														", "}
												</span>
											),
										)}
									</p>
								</div>
								<div className="py-2  border-b border-b-border">
									<p className="uppercase font-semibold text-neutral-500">
										Ülke
									</p>
									<p className="text-pretty font-mono tracking-tighter">
										{movie?.production_countries?.map(
											(c, index, array) => (
												<span key={index}>
													{c.name}
													{index !=
														array.length - 1 &&
														", "}
												</span>
											),
										)}
									</p>
								</div>
								<div className="py-2  border-b border-b-border">
									<p className="uppercase font-semibold text-neutral-500">
										Konuşulan Diller
									</p>
									<span className="text-pretty font-mono tracking-tighter">
										{movie?.spoken_languages?.map(
											(c, index, array) => (
												<span key={index}>
													{c.english_name}
													{index !=
														array.length - 1 &&
														", "}
												</span>
											),
										)}
									</span>
								</div>
								<div className="py-2  border-b border-b-border">
									<p className="uppercase font-semibold text-neutral-500">
										Bütçe
									</p>
									<span className="text-pretty font-mono tracking-tighter">
										{movie.budget + " $"}
									</span>
								</div>
								<div className="py-2  border-b border-b-border">
									<p className="uppercase font-semibold text-neutral-500">
										Gişe Hasılatı
									</p>
									<span className="text-pretty font-mono tracking-tighter">
										{movie.revenue > 0
											? movie.revenue + " $"
											: "Bilinmiyor"}
									</span>
								</div>
								<div className="py-2  border-b border-b-border">
									<p className="uppercase font-semibold text-neutral-500">
										Durum
									</p>
									<span className="text-pretty font-mono tracking-tighter">
										{movie.status === "Rumored"
											? "Söylenti"
											: movie.status === "Released"
												? "Vizyonda"
												: movie.status === "Planning"
													? "Planlanıyor"
													: movie.status ===
														  "Post Production"
														? "Post Prodüksiyonda"
														: movie.status ===
															  "In Production"
															? "Yapım Aşamasında"
															: "Bilinmiyor"}{" "}
									</span>
								</div>
							</div>
						</div>
						<div className="grid-cols-1">
							<div className="title mb-3">
								<div className="font-bold text-3xl">Rating</div>
							</div>
							<div className="border border-border rounded-xl p-6 bg-white">
								<div className="flex flex-row items-end gap-2 align-bottom font-mono">
									<p
										className={`text-4xl font-extrabold tracking-tighter ${getVoteColor("text")}`}
									>
										{movie.vote_average}
									</p>
									<p className="text-xl tracking-tighter text-neutral-500">
										/ 10
									</p>
								</div>
								<div className="h-2 w-full bg-neutral-300 rounded-full my-2">
									<div
										className={`h-full rounded-full ${
											movie.vote_average >= 7.5
												? `bg-green-500`
												: movie.vote_average >= 6
													? `bg-yellow-500`
													: `bg-red-500`
										}`}
										style={{
											width: `${movie.vote_average * 10}%`,
										}}
									></div>
								</div>
								<p className="font-semibold text-neutral-500 font-mono tracking-tigher">
									{movie.vote_count} oy üzerinden
								</p>
							</div>
							<div className="buttons flex flex-row gap-4 mt-4">
								{movie.homepage && (
									<Link
										to={movie.homepage}
										className="button-secondary border border-border w-48! text-center flex gap-2 items-center justify-center"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="lucide lucide-globe-icon lucide-globe"
										>
											<circle cx="12" cy="12" r="10" />
											<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
											<path d="M2 12h20" />
										</svg>
										Orijinal Website
									</Link>
								)}
								{movie.imdb_id && (
									<Link
										to={`https://www.imdb.com/title/${movie.imdb_id}`}
										className="button-secondary border border-border  w-48! text-center flex gap-2 items-center justify-center"
									>
										IMDB'de bak
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="lucide lucide-external-link-icon lucide-external-link"
										>
											<path d="M15 3h6v6" />
											<path d="M10 14 21 3" />
											<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
										</svg>
									</Link>
								)}
							</div>
						</div>
					</div>
					{movie.credits?.cast && movie.credits?.cast.length > 0 && (
						<div className="cast">
							<div className="title mb-3">
								<div className="font-bold text-3xl">Cast</div>
								{/* <div className="font-medium text-lg">Bişiler</div> */}
							</div>
							<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 mt-6">
								{movie.credits.cast.slice(0, 8).map((cast) => (
									<CastCard cast={cast} key={cast.id} />
								))}
							</div>
						</div>
					)}
					{movie.credits?.crew && movie.credits?.crew.length > 0 && (
						<div className="crew">
							<div className="title mb-3">
								<div className="font-bold text-3xl">Crew</div>
								{/* <div className="font-medium text-lg">Bişiler</div> */}
							</div>
							<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 mt-6">
								{movie?.credits?.crew
									.slice(0, 4)
									.map((crew) => (
										<CastCard cast={crew} key={crew.id} />
									))}
							</div>
						</div>
					)}
					{movie.images?.posters?.length > 0 && (
						<div className="posters">
							<div className="title mb-3">
								<div className="font-bold text-3xl">
									Posters
								</div>
								{/* <div className="font-medium text-lg">Bişiler</div> */}
							</div>
							<div className="flex flex-wrap flex-row gap-4 my-6">
								{movie?.images?.posters
									?.slice(0, 4)
									.map((poster) => (
										<div className="profile text-center">
											<img
												src={getImageUrl(
													"w500",
													poster.file_path,
												)}
												alt={poster.name}
												className="rounded-lg w-40"
											/>
										</div>
									))}
								{movie?.images?.backdrops
									.slice(0, 4)
									.map((backdrop) => (
										<div className="profile text-center">
											<img
												src={getImageUrl(
													"w500",
													backdrop.file_path,
												)}
												alt={backdrop.name}
												className="rounded-lg h-40"
											/>
										</div>
									))}
							</div>
						</div>
					)}
					{/* <div className="similar-movies" id={`${movie.id}-similar`}>
						<div className="title mb-3">
							<div className="font-bold text-3xl">
								Benzer filmler
							</div>
							{similiarMovies.length > 0 && (
								<div className="grid grid-cols-5 gap-4 my-6">
									{similiarMovies.map((similarMovie) => (
										<MovieCard
											key={similarMovie.id}
											movie={similarMovie}
										/>
									))}
								</div>
							)}
						</div>
					</div> */}
					<div
						className="recommended-movies"
						id={`${movie.id}-recommendations`}
					>
						<div className="title mb-3">
							<div className="font-bold text-3xl">
								Bunlar da bizim önerimiz
							</div>
						</div>
						{recommendations.length > 0 && (
							<div className="">
								<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 my-6">
									{recommendations.map((recommendedMovie) => (
										<MovieCard
											key={recommendedMovie.id}
											movie={recommendedMovie}
										/>
									))}
								</div>
								<div className="flex justify-center">
									<Link
										className="button-secondary w-48! border border-border"
										to={`/movies/${movie.id}/recommendations`}
									>
										Tüm Öneriler
									</Link>
								</div>
							</div>
						)}
					</div>
				</section>
			</main>
		</>
	);
}
