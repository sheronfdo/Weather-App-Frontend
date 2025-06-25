import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

export const getCurrentWeather = (q) => API.get('/current', { params: { q } });
export const getHistory = (q, dt) => API.get('/history', { params: { q, dt } });
export const getForecast = (q, days = 4) => API.get('/forecast', { params: { q, days } });
export const getSearchSuggestions = (q) => API.get('/search', { params: { q } });
