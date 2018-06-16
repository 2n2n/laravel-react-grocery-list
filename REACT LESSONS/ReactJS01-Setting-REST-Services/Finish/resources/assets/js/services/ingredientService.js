import axios from "axios";

export function fetchAll() {
    return axios.get('/api/ingredients/')
}

export function fetchById(id) {
    return axios.get('/api/ingredients/' + id)
        .then( (data) => data.data)
        .catch(console.log('ingredients ', e.getMessage()));
}