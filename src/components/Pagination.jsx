import { useEffect, useState } from "react";

export default function Pagination({
	page,
	totalPages,
	setSearchParams,
	query = null,
}) {
	const [nextPage, setNextPage] = useState(null);
	const [nextNextPage, setNextNextPage] = useState(null);
	const [prevPage, setPrevPage] = useState(null);
	const [prevPrevPage, setPrevPrevPage] = useState(null);
	useEffect(() => {
		setNextPage(Number(page) + 1);
		setNextNextPage(Number(page) + 2);
		setPrevPage(Number(page) - 1);
		setPrevPrevPage(Number(page) - 2);
	}, [page]);
	return (
		<div className="pagination-buttons container mx-auto mb-6 px-4">
			<div className="flex gap-2 p- justify-center">
				<button
					className="button button-primary flex gap-4 justify-center border border-border shadow-sm w-12! disabled:bg-gray-200! disabled:text-white!"
					disabled={page == 1}
					hidden={prevPrevPage == 1 || page == 1}
					onClick={() =>
						setSearchParams((prev) => {
							const next = new URLSearchParams(prev);
							next.set("page", 1);
							return next;
						})
					}
				>
					1
				</button>
				{page > 4 && (
					<span className="flex items-end justify-center text-2xl text-gray-400">
						...
					</span>
				)}
				<button
					className="button button-primary flex gap-4 justify-center border border-border shadow-sm w-12! disabled:bg-gray-200! disabled:text-white!"
					disabled={Number(page) <= 2}
					hidden={Number(page) <= 2}
					onClick={() =>
						setSearchParams((prev) => {
							const next = new URLSearchParams(prev);
							next.set("page", Number(page) - 1);
							return next;
						})
					}
				>
					{prevPrevPage}
				</button>
				<button
					className="button button-primary flex gap-4 justify-center border border-border shadow-sm w-12! disabled:bg-gray-200! disabled:text-white!"
					disabled={Number(page) <= 2}
					hidden={Number(page) <= 2}
					onClick={() =>
						setSearchParams((prev) => {
							const next = new URLSearchParams(prev);
							next.set("page", Number(page) - 1);
							return next;
						})
					}
				>
					{prevPage}
				</button>
				<div className="flex items-center justify gap-4 justify-center w-12!">
					{page}
				</div>
				<button
					className="button button-primary flex gap-4 justify-center border border-border shadow-sm w-12! disabled:bg-gray-200! disabled:text-white!"
					disabled={page == totalPages}
					hidden={page > totalPages - 1}
					onClick={() =>
						setSearchParams((prev) => {
							const next = new URLSearchParams(prev);
							next.set("page", Number(page) + 1);
							return next;
						})
					}
				>
					{nextPage}
				</button>
				<button
					className="button button-primary flex gap-4 justify-center border border-border shadow-sm w-12! disabled:bg-gray-200! disabled:text-white!"
					disabled={page == totalPages}
					hidden={page > totalPages - 2}
					onClick={() =>
						setSearchParams((prev) => {
							const next = new URLSearchParams(prev);
							next.set("page", Number(page) + 1);
							return next;
						})
					}
				>
					{nextNextPage}
				</button>
				{page < totalPages - 2 && (
					<span className="flex items-end justify-center text-2xl text-gray-400">
						...
					</span>
				)}
				<button
					className="button button-primary flex gap-4 justify-center border border-border shadow-sm w-12! disabled:bg-gray-200! disabled:text-white!"
					disabled={page == totalPages}
					hidden={page >= totalPages - 2}
					onClick={() =>
						setSearchParams((prev) => {
							const next = new URLSearchParams(prev);
							next.set("page", totalPages);
							return next;
						})
					}
				>
					{totalPages}
				</button>
			</div>
		</div>
	);
}
