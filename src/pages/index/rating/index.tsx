import React from 'react';

import { Rating } from '../../../music-rating';

type SongRatingProps = {
  rating: number;
};

type AlbumRatingProps = {
  rating: Rating;
};

export const SongRating: React.FC<SongRatingProps> = ({ rating }) => {
  const primaryRatingStyle = [
    'bg-red-200 text-red-800',
    'bg-orange-200 text-orange-800',
    'bg-yellow-200 text-yellow-800',
    'bg-green-200 text-green-800',
    'bg-teal-200 text-teal-800',
    'bg-purple-200 text-purple-800',
  ];
  const primaryRatingNames = [
    'Very bad',
    'Bad',
    'Decent',
    'Good',
    'Very good',
    'Masterpiece',
  ];

  const ratingStyle = `rounded-full font-semibold text-xs text-center px-2 ${
    primaryRatingStyle[rating - 1]
  }`;

  return <div className={ratingStyle}>{primaryRatingNames[rating - 1]}</div>;
};

export const AlbumRating: React.FC<AlbumRatingProps> = ({ rating }) => {
  const ratingStyle = [
    { background: 'bg-red-200', text: 'text-red-800' },
    { background: 'bg-red-200', text: 'text-red-800' },
    { background: 'bg-orange-200', text: 'text-orange-800' },
    { background: 'bg-orange-200', text: 'text-orange-800' },
    { background: 'bg-yellow-200', text: 'text-yellow-800' },
    { background: 'bg-green-200', text: 'text-green-800' },
    { background: 'bg-teal-200', text: 'text-teal-800' },
    { background: 'bg-blue-200', text: 'text-blue-800' },
    { background: 'bg-indigo-200', text: 'text-indigo-800' },
    { background: 'bg-purple-200', text: 'text-purple-800' },
  ];
  const secondaryRatingNames = ['Light', 'Decent', 'Strong'];

  const primaryRatingStyle = `font-bold text-lg text-center ${
    ratingStyle[rating.primary - 1].text
  }`;

  const secondaryRatingStyle = `rounded-full font-semibold text-xs text-center px-2 ${
    ratingStyle[rating.primary - 1].background
  } ${ratingStyle[rating.primary - 1].text}`;

  return (
    <div className="w-16 flex flex-col justify-center">
      <div className={primaryRatingStyle}>{`${rating.primary}`}</div>
      <div className={secondaryRatingStyle}>
        {`${secondaryRatingNames[rating.secondary - 1]}`}
      </div>
    </div>
  );
};
