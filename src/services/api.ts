import axios from 'axios';

const api = axios.create({
  baseURL: 'https://remopt.dnsalias.com/teste/API',
  timeout: 10000,
});

export default api;
