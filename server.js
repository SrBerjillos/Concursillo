const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Inicializar el servidor y el socket.io
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir los archivos estáticos
app.use(express.static('public'));

// Escuchar las conexiones de los clientes
io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');

  // Cuando un usuario presiona el botón, emitir un evento a todos los demás
  socket.on('pulsacion', (nombre) => {
    console.log(`${nombre} ha pulsado el botón`);

    // Emitir a todos los usuarios conectados el nombre y la hora de la pulsación
    io.emit('nuevoRegistro', { nombre, timestamp: Date.now() });
  });

  // Cuando un usuario se desconecta
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

// Configurar el puerto en el que el servidor escucha
server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
