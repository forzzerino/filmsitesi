export default function Spinner({ color = "text-neutral-900", size = 12 }) {
	return (
		<svg
			className={`w-${size} h-${size} animate-spin`}
			style={{ color }}
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
	);
}
