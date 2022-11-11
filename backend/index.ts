import express, { Express, Request, Response } from "express"
const app = express()
const cors = require('cors')
const axios = require("axios")
import { AxiosResponse, AxiosError } from "axios"

app.use(cors())
app.use(express.json());

app.get('/shop', (req: Request, res: Response) => {
    res.json("In shop")
})

interface pokemonInfo {
    base_experience: number,
    id: number
}

app.get('/shop/:pokemon_name', (req: Request, res: Response) => {
    const pokemon_name = req.params.pokemon_name
})


app.post("/shop/:pokemon_name", async (req: Request, res: Response) => {
    const pokemonURL = req.body.pokemonURL
    try {
        const final = await axios.get(pokemonURL).then((response: AxiosResponse) => {
            return response.data
        })

        const responseObject: pokemonInfo = {
            base_experience: final.base_experience,
            id: final.id
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