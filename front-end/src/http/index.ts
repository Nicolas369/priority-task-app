import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: "http://localhost:7000/express",
    headers: {
        'Accept': 'application/json',
    }
});
