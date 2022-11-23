var http = require('http') // Con require vamos a llamar al módulo interno de Node en cuestión. 

function webServer(req, res)
{
// En este caso, no será texto plano. Vamos a enviar código HTML
    res.writeHead(200, {'Content-Type':'text/html'}).end('<h1>Hola Node.js</h1>')
}

http
    .createServer(webServer)
    .listen(3000, 'localhost')

console.log('Servidor corriendo en http://localhost:3000/')
