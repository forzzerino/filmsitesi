import { useEffect, useState } from "react";
import { getImageUrl } from "../services/filmservice";
import { Link } from "react-router";

export default function Hero({ movie, genres }) {
	const [poster, setPoster] = useState(null);
	const [backdrop, setBackDrop] = useState(null);
	useEffect(() => {
		const backdrop = getImageUrl("w1280", movie.backdrop_path || null);
		setBackDrop(backdrop);
		const poster = getImageUrl("w500", movie.poster_path || null);
		setPoster(poster);
		console.log(movie);
	}, []);

	if (!movie) return null;
	return (
		<>
			<div id="hero" className="relative">
				<div className="grid grid-cols-2 p-6 py-12">
					<div className="my-auto pl-12">
						<div className="select-none">
							<p className="font-mono pl-2 text-gray-500">
								Özenle seçilmiş bir sinema koleksiyonu.
							</p>

							<p className="text-9xl font-bold leading-28 tracking-tighter text-secondary">
								Herhangi
								<br />
								<span className="">1</span>
								Filmsitesi.
							</p>
						</div>
						<div className="group mt-12 flex items-center gap-2 border-b-2 border-white text-white w-3/4">
							<label htmlFor="search">
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
									className="lucide lucide-search-icon lucide-search"
								>
									<path d="m21 21-4.34-4.34" />
									<circle cx="11" cy="11" r="8" />
								</svg>
							</label>
							<input
								type="search"
								name="search"
								id="search"
								placeholder="istediğin filmi ara"
								className="p-2 text-white font-semibold outline-none bg-transparent transition-all w-full"
							/>
							<span className="group-hover:translate-x-2 ransition-all duration-300 ease-in-out">
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
									className="lucide lucide-arrow-right-icon lucide-arrow-right"
								>
									<path d="M5 12h14" />
									<path d="m12 5 7 7-7 7" />
								</svg>
							</span>
						</div>
					</div>
					<div className="flex flex-col text-gray-300">
						<div className=" flex flex-col mx-auto gap-2">
							<div className="image">
								<img
									src={poster}
									alt={movie?.title}
									className="rounded-md w-96"
								/>
							</div>
							<div className="flex items-center justify-between">
								<p className="text-2xl font-bold">
									{movie?.title}
								</p>
							</div>
							<div className="flex items-center tracking-tighter font-mono leading-tight text-lg gap-2">
								{genres
									?.filter((genre) =>
										movie.genre_ids.includes(genre.id),
									)
									.slice(0, 1)
									.map((genre) => (
										<span key={genre.id}>{genre.name}</span>
									))}
								<span className="text-gray-500">•</span>
								{movie.release_date && (
									<span>
										{movie.release_date.slice(0, 4)}
									</span>
								)}
								<span className="text-gray-500">•</span>
								{movie.vote_average && (
									<span
										className={
											movie.vote_average > 7.5
												? "text-green-500"
												: movie.vote_average > 6.5
													? "text-yellow-500"
													: "text-red-500"
										}
									>
										{movie.vote_average.toFixed(1)}
									</span>
								)}
							</div>
							<div className="flex gap-2 pt-6">
								<Link
									className="button-primary text-center"
									to={`/movies/${movie?.id}`}
								>
									Detaya bak
								</Link>
								<button className="button-secondary">
									Liste'ye ekle
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="bg">
					<img
						src={backdrop}
						alt={movie?.title}
						className="absolute top-0 left-0 w-full h-full object-cover -z-50"
					/>
					<div className="absolute top-0 -z-10 left-0 w-full h-full bg-black opacity-80 blur-xl "></div>
				</div>
			</div>
		</>
	);
}
