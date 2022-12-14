import axios from "axios";
import { errorMessage } from "../interfaces/interface";
import { useAppSelector } from "../app/hooks";
const baseUrl = 'http://localhost:3001'



const getPokepage = (pokemon_name: string) => {

    const request = axios.get(`${baseUrl}/shop/${pokemon_name}`)
    return request.then(response => {
        if (response.status === 400) {

            const errorMessageObject: errorMessage = {
                message: "Error finding pokemon",
                kind: "error"
            }

            return (errorMessageObject)
        }
        return response.data
    })

}

const getAllPokemon = async () => {
    const allPokemon = await axios.get(`${baseUrl}`)

    return allPokemon.data.results
}

export default {
    getPokepage,
    getAllPokemon
}