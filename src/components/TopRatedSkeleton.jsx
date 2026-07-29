export function TopRatedSkeleton() {
	return (
		<div className="bg-gray-100 flex flex-row mx-auto max-w-200 rounded-xl relative z-0 overflow-hidden">
			<div className="w-96 min-h-135 shrink-0 bg-gray-300 animate-pulse rounded-xl rounded-r-none" />

			<div className="flex flex-col justify-between w-full">
				<div className="p-8 flex flex-col gap-4 text-xl w-full">
					<div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />

					<div className="h-10 w-3/4 bg-gray-300 rounded-lg animate-pulse" />

					<div className="flex flex-row gap-2 items-center mt-2">
						<div className="h-5 w-12 bg-gray-300 rounded animate-pulse" />
						<span className="text-gray-300">•</span>
						<div className="h-5 w-16 bg-gray-300 rounded animate-pulse" />
						<span className="text-gray-300">•</span>
						<div className="h-5 w-12 bg-gray-300 rounded animate-pulse" />
					</div>

					<div className="flex flex-col gap-2 mt-2">
						<div className="h-4 w-full bg-gray-300 rounded animate-pulse" />
						<div className="h-4 w-full bg-gray-300 rounded animate-pulse" />
						<div className="h-4 w-4/5 bg-gray-300 rounded animate-pulse" />
					</div>

					<div className="mt-12">
						<div className="h-12 w-full bg-gray-300 rounded-md animate-pulse" />
					</div>
				</div>

				<div className="flex gap-4 mb-12 px-8">
					<div className="h-10 w-40 bg-gray-300 rounded-md animate-pulse" />
					<div className="h-10 w-40 bg-gray-300 rounded-md animate-pulse" />
				</div>
			</div>

			<div
				className="absolute top-0 left-0 h-full w-full -z-10 bg-gray-200 animate-pulse"
				style={{
					WebkitMaskImage:
						"radial-gradient(circle, black 15%, transparent 80%)",
					maskImage:
						"radial-gradient(circle, black 15%, transparent 80%)",
				}}
			/>
		</div>
	);
}
