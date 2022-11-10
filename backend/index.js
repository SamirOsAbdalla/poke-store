const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())

app.get('/shop', (req, res) => {
    res.json("In shop")
})

app.get('/shop/:pokemonName', (req, res) => {
    res.json("N")
})


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})