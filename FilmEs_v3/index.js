/*
 * Javier Dacasa Gomez
 * 18/01/2022
 * Archivo principal donde se pone en marcha el servidor
 */

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const nunjucks = require('nunjucks');

const peliculas = require(__dirname + '/routes/pelicules');
const public = require(__dirname + '/routes/public');
const auth = require(__dirname + '/routes/auth');
//const directors = require(__dirname + '/routes/directors');

mongoose.connect('mongodb://localhost:27017/filmes', {useNewUrlParser: true});

// Inicializar Express
let app = express();
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.set('view engine', 'njk');
// Cargar middleware body-parser para peticiones POST y PUT
// y enrutadores
app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object'
    && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
    }
}));   
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/admin', peliculas);
app.use('/', public);
app.use('/auth', auth)

// Puesta en marcha del servidor
app.listen(8080);