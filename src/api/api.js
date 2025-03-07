import axios from 'axios';
import { getEnv } from '../helpers';

const { VITE_API_URL } = getEnv();

const api = axios.create({
    baseURL: VITE_API_URL,
});

api.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token'),
    }

    return config;
});

export default api;