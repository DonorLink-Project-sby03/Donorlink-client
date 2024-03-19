import axios from 'axios';

const serverUrl = 'https://7ab2-103-165-209-194.ngrok-free.app';
const instance = axios.create({ baseURL: serverUrl });

export default instance;
