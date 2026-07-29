import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Link, matchPath, useLocation, useNavigate } from "react-router";
import { getImageUrl, searchMovies } from "../services/filmservice";

export default function Navbar() {
	const location = useLocation();
	const navigate = useNavigate();
	const routes = [
		{
			name: "Keşfet",
			path: "/movies/trending",
		},
		{
			name: "Şimdi yayında",
			path: "/movies/now-playing",
		},
		{
			name: "Popüler",
			path: "/movies/popular",
		},
		{
			name: "Top 100",
			path: "/movies/top-rated",
		},
		{
			name: "Yakında",
			path: "/movies/upcoming",
		},
	];
	const transparentPages = ["/", "/movies/:id"];
	const excludeFromTransparentPages = [
		"/movies/search",
		"/movies/trending",
		"/movies/popular",
		"/movies/top-rated",
		"/movies/upcoming",
		"/movies/now-playing",
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

		const timer = setTimeout(async () => {
			try {
				setIsSearching(true);
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
						className="w-64 group"
						ref={searchContainerRef}
						onBlur={() =>
							setTimeout(() => {
								setShowSearchingResults(false);
								setSearchQuery("");
							}, 1000)
						}
					>
						<div
							className={`absolute -top-1 right-0 group w-64 rounded-full px-4 py-2 border border-gray-600 focus-within:w-72 transition-all 
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
						{isSearching &&
							createPortal(
								<div
									id="search-results"
									className="fixed backdrop-blur-xl bg-neutral-900/50 border border-gray-700/50 shadow-lg top-14 right-16 p-4 rounded-lg z-50 w-80 text-gray-400"
								>
									<div className="flex justify-center">
										<svg
											className="mr-3 size-5 animate-spin "
											viewBox="0 0 24 24"
										>
											<circle
												cx="12"
												cy="12"
												r="10"
												fill="none"
												stroke="hsl(0 0% 100% / 0.25)"
												strokeWidth="4"
											/>
											<path
												fill="hsl(0 0% 100%)"
												d="M22 12c0-5.523-4.477-10-10-10V0c6.627 0 12 5.373 12 12h-2z"
											/>
										</svg>
									</div>
								</div>,
								document.body,
							)}

						{showSearchingResults &&
							!isSearching &&
							searchResults &&
							searchResults.length > 0 &&
							createPortal(
								<div
									id="search-results"
									className="fixed backdrop-blur-xl bg-neutral-900/50 border border-gray-700/50 shadow-lg top-14 right-16 p-4 rounded-lg z-50 w-80 text-gray-400"
								>
									{searchResults.map((result) => (
										<Link
											to={`/movies/${result.id}`}
											key={result.id}
											className=" border-gray-700 p-2 flex justify-between items-center hover:bg-neutral-800 transition-all duration-200 rounded-lg"
										>
											<div className="flex gap-2 items-center">
												<img
													className="w-10 h-auto rounded-sm"
													src={getImageUrl(
														"w92",
														result.poster_path,
													)}
													alt={result.title}
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
								</div>,
								document.body,
							)}

						{showSearchingResults &&
							!isSearching &&
							searchResults &&
							searchResults.length == 0 &&
							createPortal(
								<div
									id="search-results"
									className="fixed backdrop-blur-xl bg-neutral-900/50 border border-gray-700/50 shadow-lg top-14 right-16 p-4 rounded-lg z-50 w-80 text-gray-400"
								>
									<div className="p-2 flex justify-between">
										Film bulunamadi.
									</div>
								</div>,
								document.body,
							)}
					</div>
				</div>
			</div>
		</header>
	);
}
