import express, { Express, Request, Response } from "express"
const app = express()

const cors = require('cors')

app.use(cors())

app.get('/shop', (req: Request, res: Response) => {
    res.json("In shop")
})




app.get('/shop/:pokemon_name', (req: Request, res: Response) => {
    const pokemon_name = req.params.pokemon_name
    res.send("hi")
})





const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})