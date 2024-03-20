import axios from 'axios';

const serverUrl = 'https://a827-2001-448a-50e0-2d5a-a18e-ab29-8182-4c65.ngrok-free.app';
const instance = axios.create({ baseURL: serverUrl });

export default instance;
