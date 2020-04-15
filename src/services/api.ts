import axios from 'axios';

export const api = axios.create({
  // baseURL: 'http://localhost:3101/',
  baseURL: 'https://music-rating-api.herokuapp.com',
});

export const lastFmApi = axios.create({
  baseURL: 'http://ws.audioscrobbler.com/2.0',
});
