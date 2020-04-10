import React from 'react';

import ListItem from '../list-item';
import { Review } from '../../../music-rating';

type Props = {
  reviews: Review[];
};

const List: React.FC<Props> = ({ reviews }) => {
  return (
    <ul className="bg-white shadow-md rounded-lg">
      {reviews.map((review, index) => (
        <ListItem key={review.id} review={review} index={index} />
      ))}
    </ul>
  );
};

export default List;
