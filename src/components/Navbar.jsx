import { useEffect, useRef, useState } from "react";
import { Link, matchPath, useLocation, useNavigate } from "react-router";
import { getImageUrl, searchMovies } from "../services/filmservice";
import Spinner from "./Spinner";
export default function Navbar() {
	const [loaded, setLoaded] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const routes = [
		{
			name: "Trend",
			path: "/movies/trending",
		},
		// {
		// 	name: "Şimdi yayında",
		// 	path: "/movies/now-playing",
		// },
		{
			name: "Popüler",
			path: "/movies/popular",
		},
		// {
		// 	name: "Top 100",
		// 	path: "/movies/top-rated",
		// },
		// {
		// 	name: "Yakında",
		// 	path: "/movies/upcoming",
		// },
	];
	const transparentPages = ["/", "/movies/:id"];
	const excludeFromTransparentPages = [
		"/movies/search",
		"/movies/trending",
		"/movies/popular",
	];
	const isTransparentPage =
		!excludeFromTransparentPages.some((path) =>
			matchPath(path, location.pathname),
		) &&
		transparentPages.some((path) => matchPath(path, location.pathname));

	const [isScrolled, setIsScrolled] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [isSearching, setIsSearching] = useState(false);
	const [showSearchingResults, setShowSearchingResults] = useState(false);
	const searchContainerRef = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			window.scrollY > 10 ? setIsScrolled(true) : setIsScrolled(false);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const query = searchQuery.trim();
		if (!query || query.lenght <= 3) {
			setShowSearchingResults(false);
			return;
		}
		setIsSearching(true);
		const timer = setTimeout(async () => {
			try {
				const results = await searchMovies(query);
				const data = results.results;
				setSearchResults(data?.slice(0, 5));
				setShowSearchingResults(true);
				setIsSearching(false);
			} catch (error) {
				setSearchResults([]);
			}
		}, 2000);

		return () => clearTimeout(timer);
	}, [searchQuery]);

	function handleSubmit(e) {
		e.preventDefault();
		const query = searchQuery.trim();
		if (query) {
			navigate(`/movies/search?query=${encodeURIComponent(query)}`);
			setSearchQuery("");
		}
	}
	useEffect(() => {
		setSearchQuery("");
		setSearchResults([]);
		setIsSearching(false);
		setShowSearchingResults(false);
	}, [location.pathname]);

	return (
		<header
			className={` ${isTransparentPage ? "fixed" : "relative"} 
            px-4 text-white w-full top-0 z-50 transition-all duration-300 ease-in-out 
            ${isTransparentPage && !isScrolled ? "bg-transparent" : ""}
            ${isTransparentPage && isScrolled ? "bg-neutral-900/50 backdrop-blur-xl shadow-lg" : ""}
            ${!isTransparentPage ? "bg-neutral-900" : ""}
            `}
		>
			<div className="max-w-350 mx-auto py-4">
				<div className="relative flex justify-between items-center gap-4">
					<h1 className="text-3xl font-semibold mb-4 md:mb-0">
						<Link to="/">Filmsitesi</Link>
					</h1>
					<div className="links flex gap-12">
						{routes.map((route) => (
							<Link to={route.path} key={route.name}>
								{route.name}
							</Link>
						))}
					</div>
					<div
						className="w-64 group transition-all duration-300"
						ref={searchContainerRef}
						onBlur={() =>
							setTimeout(() => {
								setShowSearchingResults(false);
								setSearchQuery("");
								setIsSearching(false);
							}, 200)
						}
					>
						<div
							className={`absolute -top-1 right-0 group w-64 rounded-md px-4 py-2 border border-gray-600 focus-within:w-80 focus-within:bg-neutral-900 transition-all 
                            ${isScrolled ? "backdrop-blur-2xl" : ""}`}
						>
							<form
								action=""
								className="flex justify-between items-center"
								onSubmit={handleSubmit}
							>
								<input
									type="text"
									name="search"
									id="search"
									placeholder="filmfalanfilan..."
									className="focus:outline-none w-full text-gray-400 focus:text-white"
									maxLength={30}
									value={searchQuery}
									onChange={(e) =>
										setSearchQuery(e.target.value)
									}
								/>
								<button
									type="submit"
									id="search-button"
									className="text-gray-500"
								>
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
								</button>
							</form>
						</div>
						{isSearching && (
							<div
								id="search-results"
								className="absolute backdrop-blur-xl bg-neutral-900 border border-gray-700 shadow-lg top-10 right-0 p-4 rounded-lg z-50 w-80 text-gray-400"
							>
								<div className="w-full h-full flex justify-center items-center ">
									<Spinner
										color="text-neutral-400"
										size={8}
									/>
								</div>
							</div>
						)}

						{showSearchingResults &&
							!isSearching &&
							searchResults &&
							searchResults.length > 0 && (
								<div
									id="search-results"
									className="absolute backdrop-blur-xl bg-neutral-900 border border-gray-700 shadow-lg top-10 right-0 p-4 rounded-lg z-50 w-80 text-gray-400"
								>
									{searchResults.map((result) => (
										<Link
											to={`/movies/${result.id}`}
											key={result.id}
											className=" border-gray-700 p-2 flex justify-between items-center hover:bg-neutral-800 transition-all duration-200 rounded-lg"
										>
											<div className="flex gap-2 items-center">
												{!loaded && (
													<div className="w-10 h-12 rounded-lg bg-neutral-500 flex items-center justify-center">
														<Spinner />
													</div>
												)}

												<img
													className={`w-10 h-auto rounded-sm ${loaded ? "" : "hidden"}`}
													src={getImageUrl(
														"w92",
														result.poster_path,
													)}
													alt={result.title}
													onLoad={() =>
														setLoaded(true)
													}
												/>
												<p className="line-clamp-1">
													{result.title}
												</p>
											</div>
											<p>
												{result.release_date.slice(
													0,
													4,
												)}
											</p>
										</Link>
									))}
									<Link
										to={`/movies/search?query=${encodeURIComponent(searchQuery)}`}
										className=" border-gray-700 p-2 flex justify-between items-center hover:bg-neutral-800 transition-all duration-200 rounded-lg mt-2"
									>
										<div className="flex gap-2 items-center">
											<p className="line-clamp-1 underline text-gray-300">
												{" "}
												{searchQuery
													.charAt(0)
													.toUpperCase() +
													searchQuery?.slice(1)}{" "}
												için daha çok sonuç
											</p>
										</div>
									</Link>
								</div>
							)}

						{showSearchingResults &&
							!isSearching &&
							searchResults &&
							searchResults.length == 0 && (
								<div
									id="search-results"
									className="absolute backdrop-blur-xl bg-neutral-900 border border-gray-700 shadow-lg top-10 right-0 p-4 rounded-lg z-50 w-80 text-gray-400"
								>
									<div className="p-2 flex justify-between">
										Film bulunamadi.
									</div>
								</div>
							)}
					</div>
				</div>
			</div>
		</header>
	);
}
