require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//middleware express
app.use(bodyParser.urlencoded({
    extended: true,
}))


app.use('/', (req, res) => {
    res.json({ message: "REST API APRIL BAKERY MYSQL" })
})
app.listen(process.env.PORT, (req, res) => {
    console.log(`Server is runing in ${process.env.PORT}`)
})

