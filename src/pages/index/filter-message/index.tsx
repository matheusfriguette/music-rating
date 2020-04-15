import React from 'react';

import Filter from '../filter';

type Props = {
  filter: Filter;
};

const FilterMessage: React.FC<Props> = ({ filter }) => {
  const genreMessage = filter.genre !== '' ? `${filter.genre}` : '';
  const releaseDateMessage =
    filter.releaseDate !== ''
      ? filter.releaseDate
          .replace('(', '')
          .replace(')', '')
          .replace('[0-9]', '0s')
      : 'all-time';
  const artistMessage = filter.artist !== '' ? `by ${filter.artist}` : '';

  const message = `Best ${genreMessage} albums of ${releaseDateMessage} ${artistMessage}`;

  return <div className="font-bold text-2xl">{message}</div>;
};

export default FilterMessage;
