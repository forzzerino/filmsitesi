import { useState, useEffect } from "react";
import UpcomingMovieCard from "./UpcomingMovieCard";
export default function UpcomingMovies({ upcomingMovies }) {
	return (
		<>
			<section id="upcomingmovies">
				<div className="title mb-3">
					<div className="font-bold text-3xl"># Yaklaşan Filmler</div>
				</div>
				<div className="filmcards grid grid-cols-4 gap-4 md:gap-0 lg:grid-cols-8 my-6 ">
					{upcomingMovies.slice(0, 8).map((movie) => (
						<UpcomingMovieCard key={movie.id} movie={movie} />
					))}
				</div>
			</section>
		</>
	);
}
