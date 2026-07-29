import { Link } from "react-router";

export default function Navbar() {
	return (
		<header className="bg-gray-900 text-white p-4  border-b border-gray-700 sticky top-0 z-50">
			<div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
				<h1 className="text-3xl font-semibold mb-4 md:mb-0">
					<Link to="/">Filmsitesi</Link>
				</h1>
				<div className="links flex gap-4">
					<Link to="/movies/trending">Keşfet</Link>
				</div>

				<div className="w-full md:w-1/2">
					<div className="relative">
						<input
							type="text"
							placeholder="Film ara..."
							className="w-full rounded-full bg-gray-700 text-white px-5 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-gray-800 transition-all border border-gray-600"
						/>
						<button
							type="submit"
							className="absolute right-0 top-0 bottom-0 px-4 text-gray-400 hover:text-white transition-colors"
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
					</div>
				</div>
			</div>
		</header>
	);
}
