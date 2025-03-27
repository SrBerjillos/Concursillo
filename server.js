const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir archivos estáticos (html, css, js)
app.use(express.static('public'));

// Escuchar cuando un usuario se conecta
io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');

  // Cuando alguien pulse el botón, se emite un evento
  socket.on('pulsacion', (nombre) => {
    console.log(`${nombre} ha pulsado el botón`);

    // Emitir a todos los usuarios conectados la nueva pulsación
    io.emit('nuevoRegistro', { nombre, timestamp: Date.now() });
  });

  // Cuando un usuario se desconecta
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

// Configurar el puerto en el que el servidor estará escuchando
server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});