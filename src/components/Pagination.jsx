export default function Pagination({
	page,
	totalPages,
	setSearchParams,
	query = null,
}) {
	return (
		<div className="pagination-buttons container mx-auto mb-6">
			<div className="flex gap-4 p- justify-center">
				<button
					className="button button-secondary flex gap-4 justify-center border border-border shadow-sm w-36!"
					disabled={page == 1}
					onClick={() =>
						setSearchParams({
							query,
							page: Number(page) - 1,
						})
					}
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
						className="lucide lucide-arrow-left-icon lucide-arrow-left"
					>
						<path d="m12 19-7-7 7-7" />
						<path d="M19 12H5" />
					</svg>
				</button>
				<div className="flex items-center justify">
					<p>
						<span>
							{page}/{totalPages}
						</span>
					</p>
				</div>
				<button
					className="button button-secondary flex gap-4 justify-center border border-border shadow-sm w-36!"
					disabled={page == totalPages}
					onClick={() =>
						setSearchParams({
							query,
							page: Number(page) + 1,
						})
					}
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
						className="lucide lucide-arrow-right-icon lucide-arrow-right"
					>
						<path d="M5 12h14" />
						<path d="m12 5 7 7-7 7" />
					</svg>
				</button>
			</div>
		</div>
	);
}
