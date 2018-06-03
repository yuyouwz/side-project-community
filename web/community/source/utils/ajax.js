import axios from 'axios';
const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

export const request = axios.create(config)