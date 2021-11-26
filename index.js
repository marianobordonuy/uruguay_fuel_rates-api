const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const rates = []

app.get('/', (req, res) => {
    res.json('Welcome to Uruguay Fuels API to get the current price for fuels in Uruguay. ' +
        'Current version: 0.1.0. ' +
        'Current prices of fuels in Uruguay. ' +
        'Fuel rates are determined by the government and all companies have the same rates. ' +
        'This we are working on new functionalities for this API.')
})

app.get('/fuel_rates', (req, res) => {
    axios.get('https://www.unvenu.org.uy/')
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html);

            $('.item2 tr').each(function () {
                const fuel_type = $('th', this).text()
                const price = $('td', this).text()
                rates.push({
                    fuel_type,
                    price
                })
            });
            res.json(rates)
        }).catch(err => console.log(err))
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))