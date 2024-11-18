import axios from 'axios';

// Configuração base do Axios
export const api = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});