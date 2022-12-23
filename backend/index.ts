import express, { Express, Request, Response } from "express"
import { AxiosResponse, AxiosError } from "axios"
import { PokemonClient, Pokemon, Description } from 'pokenode-ts';
const { notFound, errorHandler } = require("./middlewares/errorMiddleware")

const app = express()
const cors = require('cors')
const axios = require("axios")
const dotenv = require("dotenv")
const userRoutes = require("./routes/userRoutes")
const mongoose = require('mongoose')
const path = require("path")



dotenv.config()
app.use(express.json());
app.use(cors())


async function connectMongo() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB Database")
    }
    catch (error: unknown) {
        console.log(error);
    }
}

connectMongo()
const checkWeirdPokemonNames = (pokemonName: string) => {
    switch (pokemonName) {
        case ("enamorus-incarnate"): {
            return "enamorus"
        }
        case ("deoxys-normal"): {
            return "deoxys"
        }
        case ("wormadam-plant"): {
            return "wormadam"
        }
        case ("shaymin-land"): {
            return "shaymin"
        }
        case ("giratina-altered"): {
            return "giratina"
        }
        case ("basculin-red-striped"): {
            return "basculin"
        }
        case ("darmanitan-standard"): {
            return "darmanitan"
        }
        case ("tornadus-incarnate"): {
            return "tornadus"
        }
        case ("thundurus-incarnate"): {
            return "thundurus"
        }
        case ("landorus-incarnate"): {
            return "landorus"
        }
        case ("keldeo-ordinary"): {
            return "keldeo"
        }
        case ("meloetta-aria"): {
            return "meloetta"
        }
        case ("meowstic-male"): {
            return "meowstic"
        }
        case ("aegislash-shield"): {
            return "aegislash"
        }
        case ("pumpkaboo-average"): {
            return "pumpkaboo"
        }
        case ("gourgeist-average"): {
            return "gourgeist"
        }
        case ("zygarde-50"): {
            return "zygarde"
        }
        case ("lycanroc-midday"): {
            return "lycanroc"
        }
        case ("mimikyu-disguised"): {
            return "mimikyu";
        }
        case ("toxtricity-amped"): {
            return "toxtricity";
        }
        case ("eiscue-ice"): {
            return "eiscue";
        }
        case ("indeedee-male"): {
            return "indeedee";
        }
        case ("morpeko-full-belly"): {
            return "morpeko"
        }
        case ("urshifu-single-strike"): {
            return "urshifu"
        }
        case ("basculegion-male"): {
            return "basculegion"
        }
        default: {
            return pokemonName;
        }
    }
}



app.get('/main', async (req: Request, res: Response) => {
    const api = new PokemonClient({
        cacheOptions: { maxAge: 500000, exclude: { query: false } },
    })

    const allPokemon = await api.listPokemons(0, 905).then((response: any) => {
        return response;
    })

    res.send(allPokemon)
})



app.get("/entry/:pokemon_name", async (req: Request, res: Response) => {
    const api = new PokemonClient({
        cacheOptions: { maxAge: 500000, exclude: { query: false } },
    })

    try {
        let pokemonName = req.params['pokemon_name']
        pokemonName = checkWeirdPokemonNames(pokemonName)

        const pokemonSpecies = await api.getPokemonSpeciesByName(`${pokemonName}`)

        for (let i = pokemonSpecies.flavor_text_entries.length - 1; i >= 0; i--) {
            if (pokemonSpecies.flavor_text_entries[i].language.name === "en") {
                return res.send(pokemonSpecies.flavor_text_entries[i].flavor_text)
            }
        }
        return res.send(pokemonSpecies.flavor_text_entries[pokemonSpecies.flavor_text_entries.length - 1].flavor_text)
    }
    catch (error: unknown) {
        return res.status(400).end()
    }
})
interface pokemonInfo {
    id: number,
    stats: Array<any>,
    types: Array<any>,
    abilities: Array<any>,
    height: number,
    weight: number,
    kind: string,
    name: string,
    sprite: string
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
            name: fetchedPokemon.forms[0].name,
            sprite: fetchedPokemon.sprites.front_default as string
        }
        res.send(responseObject)
    }
    catch (error: unknown) {
        return res.status(400).end()
    }

})

app.use("/api/users", userRoutes)

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get("*", (req: Request, res: Response) =>
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    );
} else {

}
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})