import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchMovieDetails } from "../services/filmservice";
import { getImageUrl } from "../services/filmservice";
import { useMovies } from "../context/MoviesContext";
import { Link } from "react-router";

export default function MovieDetails() {
	const movieId = useParams().id;
	const [movie, setMovie] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { genres } = useMovies();
	console.log(movie);

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

				setMovie({
					...data,
					vote_average: vote_average,
					release_date: date,
					backdrop_path: backdrop,
					poster_path: poster,
				});
				setLoading(false);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}
		loadMovieDetail();
	}, []);

	if (loading) return <div>Yükleniyor</div>;
	if (error) return <div>Hata: {error.message}</div>;

	return (
		<>
			<main id={movie.id}>
				<div className="relative">
					<div className="grid grid-cols-3 p-6 py-12 ">
						<div className="mx-auto">
							<div className="image">
								<img
									src={movie.poster_path}
									alt={movie?.title}
									className="rounded-md w-96"
								/>
							</div>
						</div>
						<div className="col-span-2 flex flex-col gap-4 pt-12">
							{movie.tagline && (
								<p className="font-mono text-gray-400 tracking-tight leading-tight text-lg">
									{movie.tagline}
								</p>
							)}
							{movie.title && (
								<h1
									className={
										"text-8xl font-bold leading-20 tracking-tighter text-gray-300 "
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
									<span>{movie.genres[0].name}</span>
								)}
								<span className="text-gray-500">•</span>
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
										className={
											movie.vote_average >= 7.5
												? "bg-green-700 rounded-sm px-2 text-green-200 font-extrabold"
												: movie.vote_average >= 6
													? "bg-yellow-700 rounded-sm px-2 text-yellow-200 font-extrabold"
													: "bg-red-700 rounded-sm px-2 text-red-200 font-extrabold"
										}
									>
										{movie.vote_average}
									</span>
								)}
							</div>
							<div className="flex gap-2 w-1/2 mt-6">
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
					<div className="bg">
						<img
							src={movie.backdrop_path}
							alt={movie?.title}
							className="absolute top-0 left-0 w-full h-full object-cover -z-50"
						/>
						<div className="absolute top-0 -z-10 left-0 w-full h-full bg-black opacity-80 blur-xl "></div>
					</div>
				</div>
				<div className="max-w-350 my-12 mx-auto">
					<div className="cast">
						<div className="title mb-3">
							<div className="font-bold text-3xl">Cast</div>
							{/* <div className="font-medium text-lg">Bişiler</div> */}
						</div>
						<div className="grid grid-cols-8 my-6">
							{movie?.credits?.cast.slice(0, 8).map((cast) => (
								<div className="profile w-40 text-center">
									<img
										src={getImageUrl(
											"w185",
											cast.profile_path,
										)}
										alt={cast.name}
										className="rounded-lg w-40"
									/>
									<p className="font-bold text-lg mt-2">
										{cast.name}
									</p>
									<p className="text-gray-500 text-sm">
										{cast.character}
									</p>
								</div>
							))}
						</div>
					</div>
					<div className="crew">
						<div className="title mb-3">
							<div className="font-bold text-3xl">Crew</div>
							{/* <div className="font-medium text-lg">Bişiler</div> */}
						</div>
						<div className="grid grid-cols-8 my-6">
							{movie?.credits?.crew.slice(0, 4).map((crew) => (
								<div className="profile w-40 text-center">
									<img
										src={getImageUrl(
											"w185",
											crew.profile_path,
										)}
										alt={crew.name}
										className="rounded-lg w-40"
									/>
									<p className="font-bold text-lg mt-2">
										{crew.name}
									</p>
									<p className="text-gray-500 text-sm">
										{crew.known_for_department}
									</p>
								</div>
							))}
						</div>
					</div>
					<div className="photos">
						<div className="title mb-3">
							<div className="font-bold text-3xl">Posters</div>
							{/* <div className="font-medium text-lg">Bişiler</div> */}
						</div>
						<div className="grid grid-cols-8 my-6">
							{movie?.images?.posters
								.slice(0, 4)
								.map((poster) => (
									<div className="profile w-40 text-center">
										<img
											src={getImageUrl(
												"w185",
												poster.file_path,
											)}
											alt={poster.name}
											className="rounded-lg w-40"
										/>
										<p>{poster.vote_count}</p>
									</div>
								))}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
