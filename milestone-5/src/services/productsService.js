import axios from 'axios';

const BASE_URL = 'https://api.escuelajs.co/api/v1/products';

export const getProducts = async (limit = 10, offset = 0) => {
  const res = await axios.get(`${BASE_URL}?limit=${limit}&offset=${offset}`);
  return res.data;
}