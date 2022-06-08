const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const currentWeather = require('./utils/currentWeather')

const app = express()
const part = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory
app.use(express.static(publicDirectoryPath))

// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Oguzhan Kukul'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Oguzhan Kukul'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Oguzhan Kukul'
    })
})

app.get('/weather', (req, res) => {
    geocode(req.query.address, (error, {latitude, longitude, name} = {})=> {
        if (error) {
            return res.send({ error })
        }
        currentWeather(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                name,
                data
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: '404',
        name: 'Oguzhan',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Oguzhan',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})