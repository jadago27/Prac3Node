/*
 * Javier Dacasa Gomez
 * 18/01/2022
 * Schema para guardar informacion de usuarios
 */

const mongoose = require('mongoose');

let usuarioSchema = new mongoose.Schema({
    login: {
        type:String,
        minlength: 5,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
        //TODO Falta encriptar con bcrypt
    }
});

let Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;