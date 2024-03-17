import axios from "axios";

const serverUrl = 'http://localhost:3000'
const instance = axios.create({baseURL: serverUrl})

export default instance