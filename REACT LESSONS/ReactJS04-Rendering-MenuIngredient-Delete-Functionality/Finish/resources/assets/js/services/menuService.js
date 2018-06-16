import axios from "axios";

export function fetchAll() {
    return axios.get('/api/menus')
        .then(data => data.data)
        .catch(e => console.log(e));
}  

export function save(menuName) {
    return axios.post('/api/menus', {
        name: menuName
    })
        .then(data => data.data)
        .catch(e => console.log(e));
}

export function remove(menuId) {
    return axios.delete('/api/menus/' + menuId)
        .then(data => data.data)
        .catch(e => console.log(e));
}
