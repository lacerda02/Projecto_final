import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Altere para o endereço correto do seu backend Laravel
});

export default axiosInstance;
