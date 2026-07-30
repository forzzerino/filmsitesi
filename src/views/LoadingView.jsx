import Spinner from "../components/Spinner";

export default function LoadingView() {
	return (
		<section className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
			<div className="max-w-md w-full border-2 border-border rounded-2xl p-8">
				<div className="loading">
					<div className="inline-flex items-center justify-center w-16 h-16">
						<Spinner />
					</div>
				</div>
			</div>
		</section>
	);
}
