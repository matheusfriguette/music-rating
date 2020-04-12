import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3101/',
});

export const lastFmApi = axios.create({
  baseURL: 'http://ws.audioscrobbler.com/2.0',
});
