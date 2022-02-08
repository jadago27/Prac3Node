/*
 * Javier Dacasa Gomez
 * 21/11/2021
 * Enrutador para los servicion de directores
 */

const express = require('express');
const multer = require('multer');

let Pelicula = require(__dirname + '/../models/pelicula.js');
let autenticacion = require(__dirname + '/../utils/auth.js');

let router = express.Router();
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/imatges')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
    }
  })

let upload = multer({storage: storage});

let pelicules = [];

router.get('/', (req, res) => {
    Pelicula.find().then(resultado => {
        res.status(200)
        .render('admin_pelicules', {pelicules: resultado});
    }).catch (error => {
        res.status(500)
            .render('admin_error');
    }); 
});

router.get('/nova', (req, res) => {
    res.status(200).render('admin_pelicules_form');
});

router.get('/editar/:id', (req, res) => {
    Pelicula.findById(req.params.id).then(resultado => {
        if(resultado)
            res.status(200)
               .render('admin_pelicules_form', {pelicula: resultado });
        else
            res.status(400)
               .render('admin_error' ,{error: "Pel·lícula no trobada"});
    }).catch (error => {
        res.status(500)
            .render('admin_error');
    });  
});

router.post('/', upload.single('imatge'), (req, res) => {
    let novaPelicula = new Pelicula({
        titol: req.body.titol, 
        duracio: req.body.duracio,
        genere: req.body.genere,
        sinopsi: req.body.sinopsi,
        valoracio: req.body.valoracio
    });
    novaPelicula.save().then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.status(400)
           .render('admin_error', {error: "Error afegint pel·lícula"});
    });
});

router.put('/:id', (req,res) => {
    Pelicula.findByIdAndUpdate(req.params.id, {
        $set: {
        titol: req.body.titol, 
        duracio: req.body.duracio,
        genere: req.body.genere,
        director: req.body.director,
        valoracio: req.body.valoracio
        }
    }, {new: true}).then(resultado => {
        if (resultado)
            res.redirect(req.baseUrl);
        else
            res.status(400)
               .send({ok: false, 
                      error: "Error actualitzant dades de la pel·lícula"});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error:"Error actualitzant dades de la pel·lícula"});
    });
});

router.delete('/:id', (req,res) => {
    Pelicula.findByIdAndRemove(req.params.id).then(resultado => {
        if (resultado)
            res.status(200)
               .redirect(req.baseUrl);
               else
               res.status(400)
                  .render('admin_error' ,{error: "Error esborrand pel·lícula"});
       }).catch (error => {
           res.status(500)
               .render('admin_error');
       });
});

module.exports = router;