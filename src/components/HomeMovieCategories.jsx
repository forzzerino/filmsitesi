import { Link } from "react-router";
import HomeMovieCard from "./HomeMovieCard";
export default function HomeMovieCategories({
	id,
	title,
	desc,
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
				<div className="title mb-3">
					{title && (
						<div className="font-bold text-3xl"># {title}</div>
					)}
					{desc && <div className="font-medium text-lg">{desc}</div>}
				</div>
				<div className="filmcards grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 my-6">
					{limit
						? movies.map((movie, index) => {
								if (index < limit) {
									return (
										<HomeMovieCard
											key={movie.id}
											movie={movie}
										/>
									);
								}
							})
						: movies.map((movie) => (
								<HomeMovieCard key={movie.id} movie={movie} />
							))}
				</div>
				{route && (
					<div className="flex justify-center">
						<Link to={`${route}`} className="w-64">
							<button className="button-primary">Dahası</button>
						</Link>
					</div>
				)}
			</section>
		</>
	);
}
