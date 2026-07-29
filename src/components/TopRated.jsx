import { useEffect, useState } from "react";
import { getImageUrl, fetchMovieDetails } from "../services/filmservice";
import { Link } from "react-router";
import { TopRatedSkeleton } from "./TopRatedSkeleton";
import { motion, AnimatePresence } from "framer-motion";

export default function TopRated({ id, movies, title, desc }) {
	const [loading, setLoading] = useState(false);
	const [movie, setMovie] = useState([]);
	const [index, setIndex] = useState(0);

	const handlePrevClick = () =>
		setIndex(index === 0 ? movies.length - 1 : index - 1);

	const handleNextClick = () =>
		setIndex(index === movies.length - 1 ? 0 : index + 1);

	useEffect(() => {
		async function getMovie() {
			try {
				setLoading(true);
				const data = await fetchMovieDetails(movies[index].id);
				setMovie(data);
			} catch (error) {
				console.log("filmçekeilirkenhata", error);
			} finally {
				setLoading(false);
			}
		}
		getMovie();
	}, [index]);

	return (
		<>
			<section id={id} className="relative">
				<div className="max-w-350 my-12 py-12 mx-auto">
					{/* <div className="title mb-3">
						<div className="font-bold text-3xl">{title}</div>
						<div className="font-medium text-lg">{desc}</div>
					</div> */}
					{loading && <TopRatedSkeleton />}
					{!loading && movie && (
						<div className=" mx-auto max-w-200 flex flex-col gap-6">
							<motion.div
								key={movie.id}
								initial={{ opacity: 0, x: 0 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 0 }}
								transition={{ duration: 1 }}
							>
								<div className="bg-gray-100 flex flex-row rounded-xl shadow-2xl">
									{movie?.poster_path && (
										<img
											src={getImageUrl(
												"w500",
												movie.poster_path,
											)}
											className="w-96 rounded-xl rounded-r-none"
											alt={movie.title}
										/>
									)}

									<div className="flex flex-col justify-between">
										<div className="p-8 flex flex-col gap-4 text-xl">
											<div className="font-mono text-gray-500 text-sm flex justify-between items-center">
												<span>En çok oy almışlar</span>
												<p className="font-bold border px-2 py-0.5 text-sm rounded-full">
													#{index + 1}
												</p>
											</div>
											<p className="text-4xl font-extrabold tracking-tight">
												{movie.title}
											</p>
											<div className="font-mono flex flex-row text-base justify-between text-gray-500">
												<p>
													{movie.release_date?.slice(
														0,
														4,
													)}
												</p>
												<span>•</span>
												<p className="flex items-center align-middle gap-1">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
														className="lucide lucide-clock-icon lucide-clock"
													>
														<circle
															cx="12"
															cy="12"
															r="10"
														/>
														<path d="M12 6v6l4 2" />
													</svg>
													{movie.runtime}dk
												</p>
												<span>•</span>
												<p className="flex items-center align-middle gap-1 font-bold text-yellow-500">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
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
													<span>
														{movie.popularity}
													</span>
												</p>
											</div>
											{movie.overview && (
												<p className="tracking-tight line-clamp-3 leading-tight">
													<span>
														{movie.overview}
													</span>
												</p>
											)}
											<div className="mt-12">
												<Link
													to={`/movies/${movie.id}`}
												>
													<button className="button-primary">
														İncele
													</button>
												</Link>
											</div>
										</div>
									</div>
									<div className="-z-50 ">
										<img
											src={getImageUrl(
												"w1280",
												movie.backdrop_path,
											)}
											alt={movie.title}
											className="absolute top-0 left-0 h-full w-full -z-50 object-cover grayscale"
											style={{
												WebkitMaskImage:
													"radial-gradient(circle, black 15%, transparent 80%)",
												maskImage:
													"radial-gradient(circle, black 15%, transparent 80%)",
											}}
										/>
									</div>
								</div>
							</motion.div>
							<div className="flex gap-4 w-64 mx-auto z-10">
								<button
									className="button-secondary ring-2 ring-gray-400 text-gray-500! hover:bg-gray-300!"
									onClick={handlePrevClick}
								>
									Önceki
								</button>
								<button
									className="button-secondary ring-2 ring-gray-400 text-gray-500! hover:bg-gray-300!"
									onClick={handleNextClick}
								>
									Sonraki
								</button>
							</div>
						</div>
					)}
				</div>
			</section>
		</>
	);
}
