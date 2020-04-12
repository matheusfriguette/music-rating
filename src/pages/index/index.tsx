import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { api } from '../../services/api';
import { Review } from '../../music-rating';
import List from './list/list';
import { formatDate } from '../../services/date';

const Index: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const getReviews = async () => {
      const response = await api.get(
        `reviews?_sort=rating.primary,rating.secondary,songsAverage&_order=desc,desc,desc`,
      );

      const data = response.data.map((review: Review) => ({
        ...review,
        formattedReleaseDate: formatDate(new Date(review.releaseDate)),
      }));

      setReviews(data);
    };

    getReviews();
  }, []);

  return (
    <div className="container mx-auto px-2 mt-8">
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <div className="font-bold text-2xl">Your reviews</div>
        </div>
        <Link
          to="/insert"
          className="flex items-center bg-gray-800 px-4 py-2 text-gray-100 text-sm shadow-md rounded-lg hover:bg-gray-700 ml-4"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0-2C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 13h-5v5h-2v-5H6v-2h5V6h2v5h5v2z" />
          </svg>
          <span className="font-medium ml-4">Add review</span>
        </Link>
      </div>
      <div className="flex flex-wrap -mx-2 mt-4">
        <div className="w-full lg:w-3/4 p-2 order-2 lg:order-none">
          <List reviews={reviews} />
        </div>
        <div className="w-full lg:w-1/4 p-2"></div>
      </div>
    </div>
  );
};

export default Index;
