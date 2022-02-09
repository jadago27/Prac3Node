const express = require('express');

let Pelicula = require(__dirname + '/../models/pelicula.js');
let router = express.Router();

router.get('/', (req,res) => {
    Pelicula.find().populate('director').then(resultado => {
        res.status(200)
           .render('public_index', {resultado: resultado});
    })
});

router.get('/buscar', (req, res) => {
    Pelicula.find({titol: {$regex: req.query.buscar, $options: 'i' }}).populate('director').then(resultado => {
        res.status(200)
           .render('public_index', {resultado: resultado});
    }).catch (error => {
        res.status(500)
            .render('public_error');
    }); 
});

router.get('/pelicula/:id', (req, res) => {
    Pelicula.findById(req.params.id).then(resultado => {
        if(resultado)
            res.status(200)
            .render('public_pelicula', {pelicula: resultado});
        else
            res.status(400)
            .render('public_error', {error: "Pel·lícula no trobada"});
    }).catch (error => {
        res.status(400)
           .render('public_error');
    }); 
});

module.exports = router;