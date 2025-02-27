//express.js palvelin//
const path = require('path')
const express = require('express')

const app = express()

// polkumääritys public kansioon
const polku = path.join(__dirname, './public')

// tätä se käyttää kun saa http request
app.use(express.static(polku))

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})