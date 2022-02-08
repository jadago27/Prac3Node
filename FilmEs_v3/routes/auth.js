/*
 * Javier Dacasa Gomez
 * 21/11/2021
 * Enrutador para los servicion de directores
 */

const express = require('express');

let router = express.Router();

let generador = require(__dirname + '/../utils/generar_usuaris.js');
const Usuari = require(__dirname + '/../models/usuari');

let usuarios = [];
router.get('/login', (req, res) => {
    res.render('auth_login');
});

// Proceso de login (obtener credenciales y cotejar)
router.post('/login', (req, res) => {
    let login = req.body.login;
    let password = req.body.password;

    Usuari.find().then(resultado=> {
        let existeUsuario = resultado.filter(usuario => usuario.login == login && usuario.password == password);
        if (existeUsuario.length > 0)
        {
            req.session.usuario = existeUsuario[0].usuario;
            res.redirect('/admin');
        } else {
            res.render('auth_login', {error: "Usuario o contraseña incorrectos"});
        }
    });
    
});

// Ruta para logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;