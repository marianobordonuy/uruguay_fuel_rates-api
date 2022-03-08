const PORT = process.env.PORT || 8000
const express = require('express')
//const axios = require('axios')
//const cheerio = require('cheerio')
const fs = require('fs');
const path = require('path');
//const cron = require('node-cron');

const app = express();

//const rates = [];

//const urlQuote = 'https://www.unvenu.org.uy/';

app.get('/', (req, res) => {
    res.json('Welcome to Uruguay Fuels (Combustibles Uruguay) API! A good place to get the current price for fuels in Uruguay. ' +
        'Current version: 0.1.1. ' +
        'Current prices of fuels in Uruguay. ' +
        'Fuel rates are determined by the government and all companies have the same rates. ' +
        'We have improved ping times, please let us know if you run into issues using this API.' +
        'Contact us at hello.world@icanread.uy')
});

app.get('/fuel_rates', (req, res) => {
    //Path to file
    const filePath = path.join(__dirname,'_data', 'rates.json');
    //Read file and displays
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            res.data;
            res.writeHead(200, {'Content-Type': 'json'});
            res.write(data);
            res.end();
        } else {
            console.log(err);
        }
    });
});

//API updated manually since UNVENU webpage is OOS.

/*
async function refreshQuotes() {
    const {data} = await axios.get(urlQuote);
    const $ = cheerio.load(data);
    //File header
    $('.item2').each(function () {
        const intro = $('.item2 h1', this).text();
        rates.push({
            intro
        })
    })
    //Get relevant data
    $('.item2 tr').each(function () {
        const fuel_type = $('th', this).text();
        const price = $('td', this).text();
        rates.push({
            fuel_type,
            price
        })
    })
    //Add update timestamp
    const timestamp = new Date();
    rates.push({
        timestamp,
    })
    //Save data into fs
    fs.writeFile(path.join(__dirname, '_data', 'rates.json'), JSON.stringify(rates, null, 2), err => {
        if (err) {
            console.error(err);
        } else {
            console.log("Success");
        }
    });
}
*/

/*
Cron job to refresh the rates at midnight
cron.schedule('40 09 * * *', () => {
    refreshQuotes();
}, {
    scheduled: true,
    timezone: "America/Montevideo"
});
*/

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));