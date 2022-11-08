const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
    res.json("ok")
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})