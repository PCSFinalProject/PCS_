import axios from 'axios';

const baseURL = "http://localhost:5000";

const apiWithCredentials = axios.create({
     baseURL,
    withCredentials: true,
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
});

export default apiWithCredentials;
