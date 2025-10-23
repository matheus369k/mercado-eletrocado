import { env } from '@/env';
import axios from 'axios';

export const axiosBackEndAPI = axios.create({
  baseURL: env.VITE_DATABASE_URL,
});
