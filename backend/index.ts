import express, { Express, Request, Response } from "express"
const app = express()
const cors = require('cors')
const axios = require("axios")
import { AxiosResponse, AxiosError } from "axios"
const apicache = require("apicache");

app.use(cors())
app.use(express.json());

app.get('/shop', (req: Request, res: Response) => {
    res.json("In shop")
})

interface pokemonInfo {
    id: number,
    stats: Array<any>,
    officialArtwork: string,
    types: Array<any>,
    abilities: Array<any>,
    height: number,
    weight: number,
    kind: string
}
let cache = apicache.middleware

//caching all routes for 1 hour
app.use(cache('1 hour'))

app.get('/shop/:pokemon_name', (req: Request, res: Response) => {
    const pokemon_name = req.params.pokemon_name
})


app.post("/shop/:pokemon_name", async (req: Request, res: Response) => {
    const pokemonURL = req.body.pokemonURL
    try {
        const fetchedPokemon = await axios.get(pokemonURL).then((response: AxiosResponse) => {
            return response.data
        })

        const responseObject: pokemonInfo = {
            id: fetchedPokemon.id,
            stats: fetchedPokemon.stats,
            officialArtwork: fetchedPokemon.sprites.other["official-artwork"]["front_default"],
            types: fetchedPokemon.types,
            abilities: fetchedPokemon.abilities,
            height: fetchedPokemon.height,
            weight: fetchedPokemon.weight,
            kind: "pokemon"
        }

        res.send(responseObject)
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(400).end()
        }
    }

})


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})