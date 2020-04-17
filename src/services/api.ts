import axios from 'axios';

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://music-rating-api.herokuapp.com'
      : 'http://localhost:3101/',
});

export const lastFmApi = axios.create({
  baseURL: 'http://ws.audioscrobbler.com/2.0',
});
