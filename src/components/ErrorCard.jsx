import { Link } from "react-router";

export const ErrorCard = ({ error }) => {
	return (
		<div className="errorcard">
			<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive mb-6">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={2}
					stroke="currentColor"
					className="w-8 h-8"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
					/>
				</svg>
			</div>

			<h2 className="text-2xl font-bold text-foreground mb-3">
				Bir Hata Oluştu!
			</h2>

			<p className="text-muted-foreground text-sm mb-6 leading-relaxed">
				{error || "Beklenmedik bir sorunla karşılaşıldı."}
			</p>

			<div className="flex flex-col sm:flex-row gap-3 justify-center">
				<Link
					to="/"
					className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/95 shadow-md hover:shadow-lg text-sm"
				>
					Ana Sayfaya Dön
				</Link>
				<button
					onClick={() => window.location.reload()}
					className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground font-medium transition-all hover:bg-secondary/95 text-sm cursor-pointer"
				>
					Yeniden Dene
				</button>
			</div>
		</div>
	);
};
