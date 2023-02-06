const express = require('express') 
const router = express.Router();

const Ciudad = require('../models/ciudad');
router.get('/', async (req, res) => {
    try {
        //Le pondremos arrayPokemonDB para diferenciar
        //los datos que vienen de la base de datos
        //con respecto al arrayPokemon que tenemos EN LA VISTA
        const arrayCiudadDB = await Ciudad.find();
        console.log(arrayCiudadDB);
        res.render("ciudad", { 
            arrayCiudad: arrayCiudadDB
        })
    } catch (error) {
        console.error(error)
    }
})

router.get('/crearCiudad', (req, res) => {
    res.render('crearCiudad'); //nueva vista que llamaremos CrearEntrenador
 })

 router.post('/', async (req, res) => {
    const body = req.body //Gracias al body parser, de esta forma
    //podremos recuperar todo lo que viene del body
    console.log(body) //Para comprobarlo por pantalla
    try {
        const ciudadDB = new Ciudad(body) //Creamos un nuevo Pokemon, gracias al modelo
        await ciudadDB.save() //Lo guardamos con .save(), gracias a Mongoose
        res.redirect('/ciudad') //Volvemos al listado
    } catch (error) {
        console.log('error', error)
    }
})

router.get('/:id', async(req, res) => { //El id vendrá por el GET (barra de direcciones)
    const id = req.params.id //Recordemos que en la plantilla "pokemon.ejs" le pusimos
    //a este campo pokemon.id, por eso lo llamados con params.id
    try {
        const ciudadDB = await Ciudad.findOne({ _id: id }) //_id porque así lo indica Mongo
							//Esta variable “Pokemon” está definida arriba con el “require”
        //Buscamos con Mongoose un único documento que coincida con el id indicado
        console.log(ciudadDB) //Para probarlo por consola
        res.render('detalleCiudad', { //Para mostrar el objeto en la vista "detalle", que tenemos que crear
            ciudad: ciudadDB,
            error: false
        })
    } catch (error) { //Si el id indicado no se encuentra
        console.log('Se ha producido un error', error)
        res.render('detalleCiudad', { //Mostraremos el error en la vista "detalle"
            error: true,
            mensaje: 'Ciudad no encontrada!'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id desde backend', id)
    try {
        //En la documentación de Mongoose podremos encontrar la
        //siguiente función para eliminar
        const ciudadDB = await Ciudad.findByIdAndDelete({ _id: id });
        console.log(ciudadDB)
        // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
        // res.redirect('/ciudad') //Esto daría un error, tal y como podemos ver arriba
        if (!ciudadDB) {
            res.json({ 
                estado: false,
                mensaje: 'No se puede eliminar la ciudad.'
            })
        } else {
            res.json({
                estado: true,
                mensaje: 'Ciudad eliminada.'
            })
        } 
    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(id)
    console.log('body', body)
    try {
        const ciudadDB = await Ciudad.findByIdAndUpdate(
            id, body, { useFindAndModify: false }
        )
        console.log(ciudadDB)
        res.json({
            estado: true,
            mensaje: 'Ciudad editada'
        })
    } catch (error) {
        console.log(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar la Ciudad'
        })
    }
})


module.exports = router;
