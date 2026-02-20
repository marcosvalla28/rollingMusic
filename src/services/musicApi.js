import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const musicApi = axios.create({
    baseURL: API_URL,
});

// Agrega el token
musicApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

//  Maneja token expirado
musicApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getMySongs = async () => {
    const response = await musicApi.get('/song');
    return response.data;
};

export const uploadSong = async (formData) => {
    const response = await musicApi.post('/song', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export default musicApi;