import { env } from '@/env';
import axios from 'axios';

export const fetchProducts = axios.create({
  baseURL: env.VITE_DATABASE_URL,
});
