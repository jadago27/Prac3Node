const { SHA256 } = require('crypto-js');
const mongoose = require('mongoose');
const Usuari = require(__dirname + '/../models/usuari');

Usuari.collection.drop();

let usu1 = new Usuari({
 login: 'nacho',
 password: SHA256('12')
});

usu1.save();

let usu2 = new Usuari({
 login: 'laura',
 password: SHA256('qwertyui')
});

usu2.save();