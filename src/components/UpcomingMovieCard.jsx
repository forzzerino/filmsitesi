import { Link } from "react-router";
import { getImageUrl } from "../services/filmservice";
import Spinner from "./Spinner";
import { useState } from "react";
export default function MovieCard({ movie }) {
	const [loaded, setLoaded] = useState(false);
	return (
		<div key={movie.id} className="moviecard group">
			<Link to={`/movies/${movie.id}`} className="">
				<div className="block group rounded-full w-32 h-32 relative mx-auto">
					<div className="">
						{!loaded && (
							<div className="rounded-full bg-gray-300 w-32 h-32  flex items-center justify-center shadow-lg">
								<Spinner />
							</div>
						)}
						<img
							src={getImageUrl("w500", movie.poster_path)}
							className={`${loaded ? "" : "hidden"} w-32 border-border border-4 h-32 object-cover cursor-pointer transition-all hover:scale-110 duration-300 rounded-full`}
							alt={movie.title}
							onLoad={() => setLoaded(true)}
						/>
					</div>
				</div>
				<p className="font-bold text-center text-sm text-wrap line-clamp-1 mt-1">
					{movie.title}
				</p>
				<div className="font-mono text-sm tracking-tighter font-medium text-gray-500 text-center">
					<p className="">
						{new Intl.DateTimeFormat("tr-TR", {
							day: "numeric",
							month: "long",
							timeZone: "UTC",
						}).format(new Date(movie?.release_date))}
					</p>
				</div>
			</Link>
		</div>
	);
}
