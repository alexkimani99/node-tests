const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ciudadSchema = new Schema({
    nombre: String,
    tipo: String,
    descripcion: String
})

//Creamos el modelo
const Ciudad = mongoose.model('ciudad', ciudadSchema, "ciudad");

module.exports = Ciudad;