// Importa el módulo 'express', una infraestructura de aplicaciones web para Node.js
const express = require('express');

// Crea una instancia de una aplicación Express
const app = express();

// Importa el módulo 'http' de Node.js
const http = require('http');

// Crea un servidor HTTP utilizando la aplicación Express
const server = http.createServer(app);

// Importa la clase 'Server' de 'socket.io'
const { Server } = require('socket.io');

// Crea una instancia de 'Server' de socket.io y la asocia con el servidor HTTP
const io = new Server(server);

// Configura un evento para manejar las conexiones de sockets
io.on('connection', (socket) => {
    // console.log('Un usuario se ha conectado')
    // socket.on('chat', (msg) => {
    //     console.log('Mensaje: ', msg)
    // })

    // Configura un evento para recibir mensajes de chat y emitirlos a todos los clientes conectados
    socket.on('chat', (msg) => {
        io.emit('chat', msg); // Envía el mensaje a todos los clientes conectados
    });
});

// Configura una ruta GET para la ruta raíz ('/') que envía el archivo 'index.html' al cliente
app.get('/', (req, res) => {
    // res.send('<h1>Aplicación de chat</h1>')
    // Envía el archivo 'index.html' ubicado en la carpeta 'cliente' al cliente
    res.sendFile(`${__dirname}/cliente/index.html`);
});

// Hace que el servidor escuche en el puerto 3000
server.listen(3000, () => {
    // Muestra un mensaje en la consola indicando que el servidor está corriendo
    console.log('Servidor corriendo en http://localhost:3000');
});
