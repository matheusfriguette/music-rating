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
  const primaryRatingStyle = [
    'bg-red-200 text-red-800',
    'bg-red-200 text-red-800',
    'bg-orange-200 text-orange-800',
    'bg-orange-200 text-orange-800',
    'bg-yellow-200 text-yellow-800',
    'bg-green-200 text-green-800',
    'bg-teal-200 text-teal-800',
    'bg-blue-200 text-blue-800',
    'bg-indigo-200 text-indigo-800',
    'bg-purple-200 text-purple-800',
  ];
  const secondaryRatingNames = ['Light', 'Decent', 'Strong'];

  const ratingStyle = `rounded-full font-semibold text-sm  text-center px-2 ${
    primaryRatingStyle[rating.primary - 1]
  }`;

  return (
    <div className={ratingStyle}>
      {`${secondaryRatingNames[rating.secondary - 1]} ${rating.primary}`}
    </div>
  );
};
