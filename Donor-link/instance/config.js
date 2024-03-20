import axios from 'axios';

const serverUrl = 'https://4300-182-253-50-43.ngrok-free.app';
const instance = axios.create({ baseURL: serverUrl });

export default instance;
