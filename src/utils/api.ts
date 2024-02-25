import axios from 'axios';
import { DEFAULT_API_CONFIG } from '@/config/index';

// カスタムインスタンスの作成
export const client = axios.create({
  baseURL: DEFAULT_API_CONFIG.baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: DEFAULT_API_CONFIG.timeout,
});
