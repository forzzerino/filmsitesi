import { useState } from "react";

export default function Genres({ genres }) {
	const [selectedGenre, setSelectedGenre] = useState(null);
	return (
		<div className="max-w-350 my-12 mx-auto">
			<div className="title mb-3">
				<div className="font-bold text-3xl"># Türler</div>
				<div className="font-medium text-lg"></div>
			</div>
			<div className="">
				<div className="flex flex-row flex-wrap gap-1">
					{genres?.map((genre) => (
						<button
							key={genre.id}
							onClick={() => setSelectedGenre(genre.id)}
							className={`${selectedGenre === genre.id ? "button-primary" : "button-secondary border border-border "} w-28!`}
						>
							<p>{genre.name}</p>
							<p>{genre.id}</p>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
