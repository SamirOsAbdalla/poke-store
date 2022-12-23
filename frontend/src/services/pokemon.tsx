import axios from "axios";
import { errorMessage } from "../interfaces/interface";
import { useAppSelector } from "../app/hooks";
const baseUrl = ''



const getPokepage = (pokemon_name: string) => {

    const request = axios.get(`/shop/${pokemon_name}`)
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

const getPokemonEntry = (pokemon_name: string) => {
    const pokemonEntry = axios.get(`/entry/${pokemon_name}`)
    return pokemonEntry.then(response => {
        if (response.status === 400) {

            const errorMessageObject: errorMessage = {
                message: "Error finding pokemon",
                kind: "error"
            }

            return (errorMessageObject)
        }
        return response.data as string
    })
}

const getAllPokemon = async () => {
    const allPokemon = await axios.get(`/main`)

    return allPokemon.data.results
}


export default {
    getPokepage,
    getAllPokemon,
    getPokemonEntry
}