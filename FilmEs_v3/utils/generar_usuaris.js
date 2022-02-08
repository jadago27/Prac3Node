const mongoose = require('mongoose');
const Usuari = require(__dirname + '/../models/usuari');

Usuari.collection.drop();

let usu1 = new Usuari({
 login: 'nacho',
 password: '12345678'
});

usu1.save();

let usu2 = new Usuari({
 login: 'laura',
 password: '12345678'
});

usu2.save();