import axios from 'axios';

const serverUrl = 'https://69cd-103-165-209-194.ngrok-free.app';
const instance = axios.create({ baseURL: serverUrl });

export default instance;
