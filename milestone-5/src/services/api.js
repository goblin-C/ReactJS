import { axios } from 'axios';
const API_BASE = 'https://fakeapi.platzi.com/en/rest/products';

export async function fetchProducts() {
  const res = await axios(API_BASE);
  return res.json();
}

export async function addProduct(product) {
  const res = await axios(API_BASE, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function updateProduct(id, product) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function deleteProduct(id) {
  return fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
}
