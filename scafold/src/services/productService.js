import axios from 'axios';

const API_URL = 'https://api.escuelajs.co/api/v1/products';

export const getProducts = (offset = 0, limit = 10) =>
  axios.get(`${API_URL}?offset=${offset}&limit=${limit}`);

export const totalProducts = () =>
  axios.get(`${API_URL}`);

export const deleteProduct = (id) =>
  axios.delete(`${API_URL}/${id}`);