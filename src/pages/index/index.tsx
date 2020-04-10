import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import { Review } from '../../music-rating';
import List from './list/list';
import { formatDate } from '../../services/date';

const Index: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const getReviews = async () => {
      const response = await api.get(`reviews?_sort=finalRating&_order=desc`);

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
        <div className="flex items-center">
          <Link
            to="/insert"
            className="block bg-gray-800 px-4 py-2 text-sm shadow-md rounded-lg hover:bg-gray-700 ml-4"
          >
            <div className="font-medium">
              <span className="ml-2 text-gray-100">Add review</span>
            </div>
          </Link>
        </div>
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
