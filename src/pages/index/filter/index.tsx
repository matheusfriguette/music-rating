import React, { useState, useEffect } from 'react';

import { api } from '../../../services/api';
import { Review } from '../../../music-rating';

type Props = {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

interface Filter {
  artist: string;
  releaseDate: string;
  genre: string;
  country: string;
}

interface FilterOptions {
  artists: string[];
  releaseYear: string[];
  genres: string[];
  countries: string[];
}

const Filter: React.FC<Props> = ({ filter, setFilter }) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    artists: [],
    releaseYear: [],
    genres: [],
    countries: [],
  });

  useEffect(() => {
    const getReviews = async () => {
      const response = await api.get(
        `reviews?_sort=rating.primary,rating.secondary,songsAverage&_order=desc,desc,desc`,
      );

      setFilterOptions({
        artists: Array.from<string>(
          new Set(response.data.map((review: Review) => review.artist)),
        ).sort(),
        releaseYear: Array.from<string>(
          new Set(
            response.data.map((review: Review) =>
              new Date(review.releaseDate).getFullYear(),
            ),
          ),
        ).sort((a: any, b: any) => b - a),
        genres: Array.from<string>(
          new Set(response.data.map((review: Review) => review.genres).flat()),
        ).sort(),
        countries: Array.from<string>(
          new Set(response.data.map((review: Review) => review.country)),
        ).sort(),
      });
    };

    getReviews();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-4 font-semibold text-gray-600 text-xs uppercase tracking-wider">
        Filters
      </div>
      <div className="border-t p-4">
        <div>
          <label htmlFor="filter-artist">
            <span className="block font-medium text-sm">Artist</span>
            <select
              className="mt-1 w-full text-sm border rounded px-2 py-1 focus:outline-none"
              id="filter-artist"
              value={filter.artist}
              onChange={(e) => setFilter({ ...filter, artist: e.target.value })}
            >
              <option value="">All</option>
              {filterOptions.artists.map((artist) => (
                <option key={artist} value={artist}>
                  {artist}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-4">
          <label htmlFor="filter-year">
            <span className="block font-medium text-sm">Release Year</span>
            <select
              className="mt-1 w-full text-sm border rounded px-2 py-1 focus:outline-none"
              id="filter-artist"
              value={filter.releaseDate}
              onChange={(e) =>
                setFilter({ ...filter, releaseDate: e.target.value })
              }
            >
              <option value="">All</option>
              <option value="(201[0-9])">2010s</option>
              <option value="(200[0-9])">2000s</option>
              <option value="(199[0-9])">1990s</option>
              <option value="(198[0-9])">1980s</option>
              <option value="(197[0-9])">1970s</option>
              {filterOptions.releaseYear.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-4">
          <label htmlFor="filter-genre">
            <span className="block font-medium text-sm">Genre</span>
            <select
              className="mt-1 w-full text-sm border rounded px-2 py-1 focus:outline-none"
              id="filter-genre"
              value={filter.genre}
              onChange={(e) => setFilter({ ...filter, genre: e.target.value })}
            >
              <option value="">All</option>
              {filterOptions.genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-4">
          <label htmlFor="filter-country">
            <span className="block font-medium text-sm">Country</span>
            <select
              className="mt-1 w-full text-sm border rounded px-2 py-1 focus:outline-none"
              id="filter-country"
              value={filter.country}
              onChange={(e) =>
                setFilter({ ...filter, country: e.target.value })
              }
            >
              <option value="">All</option>
              {filterOptions.countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
