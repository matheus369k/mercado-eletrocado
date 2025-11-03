import { env } from '@/env';
import axios from 'axios';

export const axiosBackEndAPI = axios.create({
  timeout: 10000,
  baseURL: env.VITE_DATABASE_URL,
});
