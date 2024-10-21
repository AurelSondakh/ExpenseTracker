import { API_KEY } from '@env';

const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;
export const URL_GET_CURRENCY = `${BASE_URL}/codes`;
export const URL_GET_PAIR = `${BASE_URL}/pair`;
