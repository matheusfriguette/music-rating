import React, { useState } from 'react';

import { Review } from '../../../music-rating';
import { Link } from 'react-router-dom';
import { AlbumRating, SongRating } from '../rating';

type Props = {
  review: Review;
  index: number;
};

const ListItem: React.FC<Props> = ({ review, index }) => {
  const [showSongs, setShowSongs] = useState<boolean>(false);

  return (
    <li className="border-t">
      <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-4 lg:col-span-3">
          <div className="flex">
            <div className="hidden lg:flex min-w-24px justify-center items-center">
              <div className="font-semibold text-gray-600 text-lg">
                {index + 1}
              </div>
            </div>
            <img
              className="w-32 shadow ml-0 lg:ml-6"
              src={review.cover}
              alt={review.album}
            />
          </div>
        </div>
        <div className="col-span-8 lg:col-span-6">
          <div className="flex flex-col justify-center h-full">
            <div className="font-semibold">
              <span className="inline lg:hidden">{index + 1}. </span>
              {review.album}
            </div>
            <div>{review.artist}</div>
            <div className="text-sm text-gray-600">{review.genres.join()}</div>
            <div className="text-sm text-gray-600 mt-4">
              {review.formattedReleaseDate}
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <div className="flex flex-col justify-center h-full">
            <div className="flex justify-between items-center">
              <AlbumRating rating={review.rating} />
              <div className="flex text-gray-600">
                <Link
                  to={`/insert/${review.id}`}
                  className="p-2 focus:outline-none"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M1.439 16.873L0 24l7.128-1.437L24.001 5.691l-5.69-5.69L1.439 16.873zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zM21.172 5.689L7.555 19.307l-2.86-2.861L15.52 5.62l2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z" />
                  </svg>
                </Link>
                <button
                  type="button"
                  className="p-2 focus:outline-none"
                  onClick={() => setShowSongs(!showSongs)}
                >
                  {showSongs ? (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M0 7.33L2.829 4.5l9.175 9.339L21.171 4.5 24 7.33 12.004 19.5z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167L16.67 24 4.5 12.004z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSongs && (
        <div>
          <table className="w-full border-t">
            <thead className="bg-gray-100 text-gray-600 text-xs text-left uppercase tracking-wider border-b">
              <tr>
                <th className="p-4 font-semibold">#</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Rating</th>
              </tr>
            </thead>
            <tbody>
              {review.songs.map((song, _index) => (
                <tr
                  key={song.name}
                  className={`${_index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                >
                  <td className="p-4 text-sm">{_index + 1}</td>
                  <td className="p-4 text-sm">{song.name}</td>
                  <td className="p-4 text-sm">
                    <div className="inline-block">
                      <SongRating rating={song.rating} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </li>
  );
};

export default ListItem;
