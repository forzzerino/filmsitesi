import { ErrorCard } from "../components/ErrorCard";
export default function ErrorView({ error }) {
	return (
		<section className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
			<div className="max-w-md w-full border-2 border-border rounded-2xl p-8">
				<ErrorCard error={error} />
			</div>
		</section>
	);
}
