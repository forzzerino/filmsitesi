import { useMovies } from "../context/MoviesContext";
import { Link, useNavigate, useSearchParams } from "react-router";
import HomeMovieCategories from "../components/HomeMovieCategories";
import Hero from "../components/Hero";
import TopRated from "../components/TopRated";
import ErrorView from "./ErrorView";
import LoadingView from "./LoadingView";
import QuickFilter from "../components/QuickFilter";
import UpcomingMovies from "../components/UpcomingMovies";
import { useEffect, useState } from "react";
import { voteAvgs, years, sortBy } from "../services/filterservice";

export default function HomeView() {
	const navigate = useNavigate();
	const [selectedGenre, setSelectedGenre] = useState(null);
	const [selectedVoteAvgs, setSelectedVoteAvgs] = useState(null);
	const [selectedYears, setSelectedYears] = useState(null);
	const [selectedSortBy, setSelectedSortBy] = useState(null);

	const selectedFilters = [
		selectedGenre && { key: "with_genres", name: selectedGenre.name },
		selectedVoteAvgs && {
			key: "vote_average.gte",
			name: selectedVoteAvgs.name,
		},
		selectedYears && {
			key: "primary_release_year",
			name: selectedYears.name,
		},
		selectedSortBy && { key: "sort_by", name: selectedSortBy.name },
	].filter(Boolean);

	function handleClearFilters(e) {
		e.preventDefault();
		setSelectedFilters([]);
		setSelectedGenre(null);
		setSelectedVoteAvgs(null);
		setSelectedYears(null);
		setSelectedSortBy(null);
	}
	function handleFilterChange(e) {
		e.preventDefault();
		const newFilters = [];
		if (selectedGenre) {
			newFilters.push({
				key: "with_genres",
				name: selectedGenre.name,
				id: selectedGenre.id,
			});
		}
		if (selectedVoteAvgs) {
			newFilters.push({
				key: "vote_average.gte",
				name: selectedVoteAvgs.name,
				id: selectedVoteAvgs.id,
			});
		}
		if (selectedYears) {
			newFilters.push({
				key: "primary_release_year",
				name: selectedYears.name,
				id: selectedYears.id,
			});
		}
		if (selectedSortBy) {
			newFilters.push({
				key: "sort_by",
				name: selectedSortBy.name,
				id: selectedSortBy.id,
			});
		}
		setSelectedFilters(newFilters);
	}

	function handleSubmit(e) {
		e.preventDefault();
		const params = new URLSearchParams();
		if (selectedGenre) params.append("with_genres", selectedGenre.id);
		if (selectedVoteAvgs)
			params.append("vote_average.gte", selectedVoteAvgs.id);
		if (selectedYears)
			params.append("primary_release_year", selectedYears.id);
		if (selectedSortBy) params.append("sort_by", selectedSortBy.id);

		navigate(`/movies/discover?${params.toString()}`);
	}
	const {
		loading,
		error,
		popularMovies,
		trendingMovies,
		topRatedMovies,
		upcomingMovies,
		genres,
	} = useMovies();

	const [randomNumber] = useState(() => Math.floor(Math.random() * 20) + 1);

	if (loading) return <LoadingView />;
	if (error) return <ErrorView error={error.message} />;
	return (
		<>
			<Hero movie={trendingMovies[randomNumber]} genres={genres} />
			<div className="flex flex-col md:flex-row max-w-350 mx-auto my-12">
				<div className="w-10/12 container flex flex-col gap-12 mx-auto px-4">
					<UpcomingMovies
						upcomingMovies={upcomingMovies}
						loading={loading}
						error={error}
					/>

					<HomeMovieCategories
						id="trendingMovies"
						title={"Trending"}
						desc="Bu haftaki trend filmler, sizin için seçtik."
						movies={trendingMovies}
						loading={loading}
						error={error}
						route={"/movies/trending"}
						limit={5}
					/>

					<TopRated
						id="topRatedMovies"
						movies={topRatedMovies}
						title={"En çok oy almışlar"}
						desc={"En çok oy almış filmler."}
					/>
					<HomeMovieCategories
						id="popularMovies"
						title={"Popüler Filmler"}
						desc="Bir de popüler filmlere göz atın."
						movies={popularMovies}
						loading={loading}
						error={error}
						route={"/movies/popular"}
						limit={5}
					/>
				</div>
				<div className="w-2/12 sticky top-20 h-fit flex-1 md:flex-2 px-4">
					<div className="font-bold text-lg mb-2 flex justify-between items-center">
						<p>Filtreler</p>
						<button
							hidden={selectedFilters.length === 0}
							className="text-xs font-medium py-0.5 px-1.5 rounded-full border-2 border-border cursor-pointer"
							onClick={handleClearFilters}
						>
							Temizle
						</button>
					</div>
					<div className="flex gap-2 flex-wrap text-sm mb-4">
						{selectedFilters.map((filter) => (
							<span
								key={filter.key}
								className="bg-gray-200 px-2 py-0.5 rounded-full border border-border"
							>
								{filter.name}
							</span>
						))}
					</div>
					<form
						type="submit"
						onSubmit={handleSubmit}
						className="flex flex-col gap-2"
					>
						<QuickFilter
							title={"Türler"}
							options={genres}
							value={selectedGenre}
							onClick={setSelectedGenre}
						/>
						<QuickFilter
							title={"Oy Ortalaması"}
							options={voteAvgs}
							value={selectedVoteAvgs}
							onClick={setSelectedVoteAvgs}
						/>
						<QuickFilter
							title={"Yayın Yılı"}
							options={years}
							value={selectedYears}
							onClick={setSelectedYears}
						/>
						<QuickFilter
							title={"Sıralama"}
							options={sortBy}
							value={selectedSortBy}
							onClick={setSelectedSortBy}
						/>

						<button
							className="button-primary disabled:bg-red-300! disabled:text-gray-500! disabled:cursor-not-allowed!"
							disabled={selectedFilters.length === 0}
						>
							Filtrele
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
