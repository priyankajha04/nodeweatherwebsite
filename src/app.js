const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weatherRequest = require('./utils/weatherRequest')


// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//Setup handlebar engine and views location

app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialspath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Priyanka J'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About page',
        name: 'Priyanka J'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help page',
        name: 'Priyanka J',
        message: 'Let us know what you need assistance on!!'
    })
})


// app.get('',(req,res) => {
//         res.send('')
// }
// )


// app.get('/help',(req,res) => {
//     res.send({
//         name: 'Pri',
//         age : 28 
//     })
// }
// )


// app.get('/about',(req,res) => {
//     res.send('<title>ABOUT TITLE</title>')
// }
// )

app.get('/weather',(req,res) => {
    if(!req.query.address) {
       return res.send({
                error: 'Please provide the address'
            })
    }
  geocode(req.query.address, (error,{longitude,latitude, location}) => {
     if(error) {
            return res.send({error})
              }
        weatherRequest(latitude,longitude, (error,data) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                    forecast: data,
                    location,
                    address: req.query.address
                })
    })   
})

})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: 'Help Page not found',
        name: 'Priyanka J'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: 'Page not found',
        name: 'Priyanka J'
    })
})
app.listen(3000, () => {
    console.log('Server is running!!')
})