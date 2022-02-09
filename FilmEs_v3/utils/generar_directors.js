const mongoose = require('mongoose');
const Director = require(__dirname + '/../models/director');

Director.collection.drop();

let dir1 = new Director({
 nom: 'Nacho',
 naixement: 1956
});

dir1.save();

let dir2 = new Director({
    nom: 'Juancho',
    naixement: 1964
});

dir2.save();