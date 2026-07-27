export default function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className="bg-gray-900 text-white p-4 shadow-lg border-b border-gray-700 sticky top-0 z-50">
			<div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
				<h1 className="text-3xl font-extrabold mb-4 md:mb-0">
					Filmsitesi
				</h1>
				<div>
					<p>© {year} Filmsitesi. Bazı hakları saklıdır.</p>
					<div>
						<p>
							İletişim:{" "}
							<a href="mailto:[EMAIL_ADDRESS]">[EMAIL_ADDRESS]</a>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
