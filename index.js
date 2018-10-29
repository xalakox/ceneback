
const express = require('express')
const app = express()
const port = 3000


app.get('/', (req, res) => res.send('Ok'))

app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}!`))
