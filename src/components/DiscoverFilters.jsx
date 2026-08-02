import { useEffect, useState } from "react";
import { useMovies } from "../context/MoviesContext";
import Select from "./ui/Select";
import { voteAvgs, years, sortBy } from "../services/filterservice";
export default function DiscoverFilters({ searchParams, setSearchParams }) {
	const selectedGenre = searchParams.get("with_genres");
	const selectedVoteAvg = searchParams.get("vote_average.gte");
	const selectedYear = searchParams.get("primary_release_year");
	const sort = searchParams.get("sort_by");
	const { genres } = useMovies();

	function handleChange(key, value) {
		setSearchParams((prev) => {
			const next = new URLSearchParams(prev);
			if (value) next.set(key, value);
			else next.delete(key);
			next.delete("page");
			return next;
		});
	}
	return (
		<div className="md:px-2 md:py-4">
			<div className="container max-w-350 mx-auto">
				<div className="flex flex-row flex-wrap gap-4">
					<Select
						options={genres}
						value={
							genres.find(
								(g) => g.id === Number(selectedGenre),
							) ?? null
						}
						onClick={(opt) => handleChange("with_genres", opt?.id)}
						placeholder="Kategori"
						rows={5}
					/>

					<Select
						options={voteAvgs}
						value={
							voteAvgs.find(
								(g) => g.id === Number(selectedVoteAvg),
							) ?? null
						}
						onClick={(opt) =>
							handleChange("vote_average.gte", opt?.id)
						}
						placeholder="Oy Ortalaması"
						rows={voteAvgs.length}
					/>
					<Select
						options={years}
						value={
							years.find((y) => y.id === Number(selectedYear)) ??
							null
						}
						onClick={(opt) =>
							handleChange("primary_release_year", opt?.id)
						}
						placeholder="Yayın Yılı"
						rows={7}
					/>
					<Select
						options={sortBy}
						value={sortBy.find((s) => s.id === sort) ?? null}
						onClick={(opt) => handleChange("sort_by", opt?.id)}
						placeholder="Sırala"
						rows={sortBy.length}
					/>
				</div>
			</div>
		</div>
	);
}
