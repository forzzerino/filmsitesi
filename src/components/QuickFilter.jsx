import { useRef, useState } from "react";

export default function QuickFilter({ title, options, value, onClick }) {
	const [isOpen, setIsOpen] = useState(true);
	const ref = useRef(null);

	return (
		<div className="flex flex-col justify-center border-2 border-border rounded-lg p-2">
			<div className={` ${isOpen ? "mb-2" : ""}`}>
				<div
					className="flex w-full flex-col cursor-pointer"
					onClick={() => setIsOpen(!isOpen)}
				>
					<div className="flex w-full justify-between gap-4">
						<div className="">
							<div className="font-semibold text-neutral-500">
								{title}
							</div>
						</div>
						<div
							className="flex justify-end cursor-pointer "
							onClick={() => setIsOpen(!isOpen)}
						>
							<button
								type="button"
								className={`cursor-pointer transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`}
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
									className="lucide lucide-chevron-down-icon lucide-chevron-down"
								>
									<path d="m6 9 6 6 6-6" />
								</svg>
							</button>
						</div>
					</div>
					{!isOpen && <p className="font-semibol">{value?.name}</p>}
				</div>
			</div>

			<div
				className={`${isOpen ? "block starting:-translate-y-4 starting:opacity-0 opacity-100 translate-y-0" : "hidden"} transition-all duration-300`}
				ref={ref}
			>
				<div className="grid grid-cols-2 gap-1 text-sm ">
					{options?.map((opt) => (
						<button
							type="button"
							key={opt.id}
							onClick={() => {
								onClick(opt.id === value?.id ? null : opt);
							}}
							className={`${value?.id === opt.id ? "bg-primary border-2 border-red-700 font-bold text-gray-200" : "bg-gray-300 border border-border "}
                            rounded-lg min-h-8 cursor-pointer transition-300 transition-all leading-tight tracking-tight p-1`}
						>
							<p>{opt.name}</p>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
