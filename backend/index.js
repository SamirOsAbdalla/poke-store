const { response } = require('express');
const express = require('express')
const app = express()


app.get('/shop/:pokemon_name', (req, res) => {
    response.json("hi")
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})