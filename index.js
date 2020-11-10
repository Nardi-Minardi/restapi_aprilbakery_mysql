require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const database = require('./manager/database');

// //connection db
// const conn = new database({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'rest_api_aprilbakery'
// })

// global.db = conn


//middleware express
app.use(bodyParser.urlencoded({
    extended: true,
}))
app.use(bodyParser.json())

//routes
app.use('/v1', require('./routes/usersRoute'))

app.use('/', (req, res) => {
    res.json({ message: 'REST API APRIL BAKERY MYSQL' })
})
app.listen(process.env.PORT, (req, res) => {
    console.log(`Server is runing in ${process.env.PORT}`)
})



