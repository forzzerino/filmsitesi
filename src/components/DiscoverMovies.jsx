import { Link } from "react-router";
import MovieCard from "./MovieCard";
export default function DiscoverMovies({
	id,
	movies,
	loading,
	error,
	route,
	limit = 10,
}) {
	if (loading)
		return (
			<div className="flex justify-center py-20">
				<div className="animate-spin rounded-full h-12 w-12 border-b-6 border-primary"></div>
			</div>
		);
	if (error)
		return <div className="text-center py-20 text-red-500">{error}</div>;

	return (
		<>
			<section id={id}>
				<div className="max-w-350 mb-12 mx-auto px-0">
					<div className="filmcards grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8 my-6">
						{limit
							? movies.map((movie, index) => {
									if (index < limit) {
										return (
											<MovieCard
												key={movie.id}
												movie={movie}
											/>
										);
									}
								})
							: movies.map((movie) => (
									<MovieCard key={movie.id} movie={movie} />
								))}
					</div>
					{route && (
						<div className="flex justify-center">
							<Link to={`${route}`} className="w-64">
								<button className="button-primary">
									Dahası
								</button>
							</Link>
						</div>
					)}
				</div>
			</section>
		</>
	);
}
