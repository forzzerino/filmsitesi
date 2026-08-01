import { Link } from "react-router";
import { getImageUrl } from "../services/filmservice";
import Spinner from "./Spinner";
import { useState } from "react";
export default function MovieCard({ movie }) {
	const [loaded, setLoaded] = useState(false);
	return (
		<div key={movie.id} className="moviecard group">
			<Link to={`/movies/${movie.id}`} className="">
				<div className="block group overflow-hidden rounded-lg relative">
					<div className="">
						<div className="absolute top-0 left-0 h-full w-full bg-linear-to-t from-black from-20% to-transparent text-gray-300 p-4 opacity-0 flex flex-col justify-end gap-4 group-hover:opacity-100 items-end text-sm transition-all duration-300 z-10">
							{movie.overview && (
								<p className="text-balance line-clamp-6">
									{movie.overview}
								</p>
							)}
							{!movie.overview && (
								<p className="block w-full text-start">
									Açıklama girilmemiş
								</p>
							)}
							<button className="button-secondary">Devamı</button>
						</div>
						{!loaded && (
							<div className="h-64 sm:h-80 lg:h-96 w-full rounded-lg bg-gray-300 flex items-center justify-center">
								<Spinner />
							</div>
						)}
						<img
							src={getImageUrl("w500", movie.poster_path)}
							className={`${loaded ? "" : "hidden"} h-64 sm:h-80 lg:h-96 w-full rounded-lg object-cover cursor-pointer transition-all duration-300`}
							alt={movie.title}
							onLoad={() => setLoaded(true)}
						/>
					</div>
				</div>
				<p className="font-bold text-lg line-clamp-1 mt-1">
					{movie.title}
				</p>
				<div className="flex flex-row justify-between items-center mt-1 font-mono text-sm tracking-tighter font-medium">
					<p className="flex items-center gap-1 text-yellow-500  rounded-md px-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill="currentColor"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="lucide lucide-star-icon lucide-star"
						>
							<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
						</svg>
						{movie.vote_average.toFixed(1)}
					</p>
					<p className="">{movie?.release_date?.substring(0, 4)}</p>
				</div>
				{/* {movie.genre_ids.map((genre) => {
							return <p>{genre.id}</p>;
						})} */}
			</Link>
		</div>
	);
}
