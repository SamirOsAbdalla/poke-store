import axios from "axios";
const baseUrl = 'http://localhost:3001'

const getPokepage = (pokemon_name: string) => {
    const request = axios.get(`${baseUrl}/shop/${pokemon_name}`)
    return request.then(response => {
        return response.data
    })
}

export default {
    getPokepage
}
