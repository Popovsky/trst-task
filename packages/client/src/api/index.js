import axios from 'axios';

const apiInstance = axios.create({
  baseURL: `http://localhost:${process.env.PORT ?? 5000}/api`,
});

export const getProducts = async () => {
  return await apiInstance.get('/product');
};
export const createProduct = async (data) => {
  return await apiInstance.post('/product', data);
};
export const updateProduct = async (id, data) => {
  return await apiInstance.put(`/product/${id}`, data);
};
export const deleteProduct = async (id) => {
  return await apiInstance.delete(`/product/${id}`);
};

export const createNextCounterState = data => apiInstance.post('/counter', data);
export const getCounterState = () => apiInstance.get('/counter');

export default apiInstance;
