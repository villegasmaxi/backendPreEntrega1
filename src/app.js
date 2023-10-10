
// app.js
import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import http from 'http'; 
import { Server } from 'socket.io';
import { Server as SocketIoServer } from 'socket.io'; // Importa Server con alias

import router from './router/routes.js';
import bodyParser from 'body-parser';

import productManager from './products.js';

const app = express();
const port = 8080; 

const server = http.createServer(app); // Crea el servidor HTTP

// const server = app.listen(port, ()=>{
//   console.log('servidor arriba');
// });
// Configura el servidor de Socket.io
const io = new SocketIoServer(server);
// Configura el servidor de Socket.io
//const io = socketIo(server);

//config handlebars
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname+'public'));

// app.get('/',(req, res)=>{
//   let testUser = {
//     name: "maxi",
//     lastName:"villegas"
//   }
//   res.render('index', testUser);
// });

// Ruta para la vista home
app.get('/', (req, res) => {
  res.render('home');
});

// Ruta para la vista en tiempo real
app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});



io.on('connection', (socket) => {
  console.log('Cliente conectado');


  // Ejemplo de emisión de productos actualizados
  socket.on('updateProducts', () => {
      const products = productManager.getProducts();
      io.emit('productsUpdated', products); // Emite la lista actualizada a todos los clientes
  });
});




app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', router);

server.listen(8080, () => {
  console.log(`Servidor arriba`);
});

server;
 