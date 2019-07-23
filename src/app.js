const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// Define path
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dat Loi'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Dat Loi'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        HelpText: 'Help',
        name: 'Dat Loi'
    })
})

app.get('/Weather', (req, res) =>{

    if (!req.query.address){
        return res.send({
            error: 'Search needs to be provided'
        })
    }

    geocode(req.query.address, (error, data={})=> {
        if (error){
            return console.log(error)
        }
        if (data == "Invalid location provided"){
            return res.send({
                error: data
            })
        }
        forecast(parseFloat(data.latitude),parseFloat(data.longitude),(forecast_error,forecast_data) => {
            if (forecast_error){
                return console.log(forecast_error)
            }
            res.send({
                forecast: forecast_data,
                location: data.location,
                address: req.query.address
            })
        }) 
    })
})



app.get('/products', (req, res) =>{
    if (!req.query.search){
        return res.send({
            error: 'Search needs to be provided'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})