import axios from 'axios';

const serverUrl = 'https://f59d-182-253-50-43.ngrok-free.app';
const instance = axios.create({ baseURL: serverUrl });

export default instance;
