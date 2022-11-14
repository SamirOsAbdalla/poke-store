import express, { Express, Request, Response } from "express"
import { AxiosResponse, AxiosError } from "axios"
import { PokemonClient, Pokemon } from 'pokenode-ts';
const app = express()
const cors = require('cors')
const axios = require("axios")


app.use(cors())
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
    const api = new PokemonClient({
        cacheOptions: { maxAge: 500000, exclude: { query: false } },
    })

    const allPokemon = await api.listPokemons(0, 1154).then(response => {
        return response;
    })

    res.send(allPokemon)
})

interface pokemonInfo {
    id: number,
    stats: Array<any>,
    types: Array<any>,
    abilities: Array<any>,
    height: number,
    weight: number,
    kind: string,
    name: string
}

app.get("/shop/:pokemon_name", async (req: Request, res: Response) => {
    const api = new PokemonClient({
        cacheOptions: { maxAge: 500000, exclude: { query: false } },
    })

    //fetches name from path parameters
    const pokemonName = req.params['pokemon_name']

    try {
        const fetchedPokemon = await api.getPokemonByName(pokemonName)
            .then((responsePokemon: Pokemon) => {
                return responsePokemon
            })

        const responseObject: pokemonInfo = {
            id: fetchedPokemon.id,
            stats: fetchedPokemon.stats,
            types: fetchedPokemon.types,
            abilities: fetchedPokemon.abilities,
            height: fetchedPokemon.height,
            weight: fetchedPokemon.weight,
            kind: "pokemon",
            name: fetchedPokemon.forms[0].name
        }
        res.send(responseObject)
    }
    catch (error: unknown) {
        return res.status(400).end()
    }

})


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})