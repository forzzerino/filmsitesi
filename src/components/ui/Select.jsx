import { useEffect, useRef, useState } from "react";

export default function Select({
	options,
	value,
	onClick,
	placeholder,
	rows = 1,
	searchParams,
	setSearchParams,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		const handler = (e) => {
			if (!ref.current?.contains(e.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
		};
	}, []);

	return (
		<div ref={ref} className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full cursor-pointer bg-background border border-border p-1 md:p-2 font-semibold text-neutral-500 flex gap-4 justify-between items-center rounded-lg min-w-32 leading-tight"
			>
				<p className="text-sm md:text-base flex flex-col font-bold text-left">
					{placeholder}
					{value?.name ? (
						<span className="text-neutral-700 text-xs md:text-sm font-medium tracking-tight">
							{value?.name}
						</span>
					) : (
						<span className="text-neutral-400 text-xs md:text-sm font-medium tracking-tight">
							Seçilmemiş
						</span>
					)}
				</p>
				{isOpen ? (
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
						className="lucide lucide-chevron-down-icon lucide-chevron-down"
					>
						<path d="m6 9 6 6 6-6" />
					</svg>
				) : (
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
						className="lucide lucide-chevron-down-icon lucide-chevron-down"
					>
						<path d="m18 15-6-6-6 6" />
					</svg>
				)}
			</button>
			{isOpen && (
				<ul
					style={{ gridTemplateRows: `repeat(${rows}, auto)` }}
					className={`absolute grid cursor-pointer grid-flow-col font-semiboldtext-neutral-500 z-60 p-2 bg-background top-full left-0 rounded-lg mt-1 w-fit  md:min-w-24 gap-2 shadow-2xl border-2 border-border`}
				>
					{options?.map((option) => (
						<li
							key={option?.id}
							className={`cursor-pointer px-1 md:px-1.5 py-1 md:py-2 hover:bg-neutral-300 rounded-md transition-all duration-300 hover:text-neutral-700text-base ${
								value?.id === option.id ? "bg-neutral-300" : ""
							}`}
							onClick={() => {
								onClick(
									value?.id === option.id ? null : option,
								);
								setIsOpen(false);
							}}
						>
							{option.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
