import { Link } from "react-router";
import MovieCard from "./MovieCard";
export default function MovieCategories({
	id,
	title,
	desc,
	movies,
	loading,
	error,
	route,
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
				<div className="max-w-350 my-12 mx-auto">
					<div className="title mb-3">
						<div className="font-bold text-3xl"># {title}</div>
						<div className="font-medium text-lg">{desc}</div>
					</div>
					<div className="filmcards grid grid-cols-5 gap-8 my-6">
						{movies.map((movie, index) => {
							if (index <= 9) {
								return (
									<MovieCard key={movie.id} movie={movie} />
								);
							}
						})}
					</div>
					<div className="flex justify-center">
						<Link to={`${route}`} className="w-64">
							<button className="button-primary">Dahası</button>
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}
