import Spinner from "./Spinner";
import { getImageUrl } from "../services/filmservice";
import { useState } from "react";
export default function CastCard({ cast }) {
	const [loaded, setLoaded] = useState(false);
	return (
		<div className="profile w-40 text-center">
			{!cast.profile_path ? (
				<div className="w-40 h-60 rounded-lg bg-gray-300 flex items-center justify-center text-neutral-400">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="56"
						height="56"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="lucide lucide-circle-user-round-icon lucide-circle-user-round"
					>
						<path d="M17.925 20.056a6 6 0 0 0-11.851.001" />
						<circle cx="12" cy="11" r="4" />
						<circle cx="12" cy="12" r="10" />
					</svg>
				</div>
			) : (
				<div className="relative w-40 h-auto">
					{!loaded && (
						<div className="w-40 h-60 rounded-lg bg-gray-300 flex items-center justify-center">
							<Spinner />
						</div>
					)}

					<img
						src={getImageUrl("w185", cast.profile_path)}
						alt={cast.name}
						className={`rounded-lg w-40 ${loaded ? "" : "hidden"}`}
						onLoad={() => setLoaded(true)}
					/>
				</div>
			)}
			<p className="font-bold text-lg mt-2">{cast.name}</p>
			<p className="text-gray-500 text-sm">{cast.known_for_department}</p>
		</div>
	);
}
