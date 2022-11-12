import axios from "axios";
import { errorMessage } from "../interfaces/interface";
const baseUrl = 'http://localhost:3001'

const getPokepage = (pokemon_name: string) => {
    const allPokemonNames = window.localStorage.getItem("ALL_POKEMON_NAMES") as string

    if (JSON.parse(allPokemonNames)[pokemon_name] === undefined) {


        const errorMessageObject: errorMessage = {
            message: "Error finding pokemon",
            kind: "error"
        }

        return (Promise.resolve(errorMessageObject))
    }
    else {
        const url = JSON.parse(allPokemonNames)[pokemon_name].url

        const request = axios.post(`${baseUrl}/shop/${pokemon_name}`, {
            pokemonURL: url
        })
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
}


export default {
    getPokepage
}