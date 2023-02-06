const express = require('express')
const bodyParser  = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


require('dotenv').config()

const port = process.env.PORT || 4000

//Conexión a base de datos
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.lnh2klt.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`; //URL de conexión, que completaremos luego
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))
//Middleware
app.use(express.static(__dirname + '/public'))

//Motor plantillas
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')


app.get('/contacto', (req, res) => {
    res.render("contacto", {tituloContacto : "Estas en contacto jaja"})
})

//LLamadas a las rutas
app.use('/', require('./router/rutas'))
app.use('/pokemon', require('./router/pokemon'))

app.use('/entrenador', require('./router/entrenador'))
app.use('/ciudad', require('./router/ciudad'))

app.use((req, res) => {
    res.status(404).render("404", {
        titulo: "404, Por aquí no hay nada.",
        descripcion: "Te has equivocado de ruta"
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
