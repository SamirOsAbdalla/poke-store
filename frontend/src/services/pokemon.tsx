import axios from "axios";
const baseUrl = 'http://localhost:3001'

const getPokepage = (pokemonName: string) => {
    const request = axios.get(`${baseUrl}`)
    return request.then(response => {
        return response.data
    })
}

export default {
    getPokepage
}
