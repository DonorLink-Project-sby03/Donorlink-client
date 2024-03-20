import axios from 'axios';


const serverUrl = 'https://b1a9-103-165-209-194.ngrok-free.app';
const instance = axios.create({ baseURL: serverUrl });

export default instance;
