import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3333',  
});

export default instance;