require('dotenv').config()
require('express-async-errors')


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors');
const corsOptions = require('./config/corsOptions')

const bodyParser = require('body-parser');

const mongoose = require('mongoose');



const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "PUT", "DELETE", "PATCH", "POST"],
    credentials: true,

}));




var usersRoutes = require('./routes/UserRoute');
var userRoutes = require('./routes/UserRoutes');

var indexRouter = require('./routes/index');
var evenementsRoutes = require('./routes/EvenementRoute');


//const { loggers } = require('./middleware/logger')

const port = process.env.PORT || 3500; // Change 3500 to another port number

console.log(process.env.NODE_ENV)


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));



app.use(logger)


app.use(express.json())

app.use(cookieParser())


app.use('/evenements', evenementsRoutes);


//import database

var configDB = require('./mongodb.json');
//mongo config
const connect = mongoose.connect(configDB.mongo.uri);


require('./models/Evenement')
require('./models/User')


app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use('/users', require('./routes/UserRoute'))
app.use('/notes', require('./routes/noteRoutes'))
app.use('/auth', require('./routes/authRoutes'))


app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})



app.use(errorHandler)



module.exports = app;