export default function LoadingView() {
	return (
		<section className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
			<div className="max-w-md w-full border-2 border-border rounded-2xl p-8">
				<div className="loading">
					<div className="inline-flex items-center justify-center w-16 h-16">
						<svg
							className="w-12 h-12 animate-spin"
							viewBox="0 0 24 24"
							fill="none"
						>
							<circle
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="3"
								className="opacity-20"
							/>
							<path
								d="M22 12c0-5.523-4.477-10-10-10"
								stroke="currentColor"
								strokeWidth="3"
								strokeLinecap="round"
							/>
						</svg>
					</div>
				</div>
			</div>
		</section>
	);
}
