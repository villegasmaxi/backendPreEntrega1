// app.js
import express from "express";
import handlebars from "express-handlebars";
import http from "http";
import { Server as SocketIoServer } from "socket.io"; // Importa Server con alias

import router from "./router/routes.js";
import bodyParser from "body-parser";

import productManager from "./products.js";
import ProductDao from "./dao/productDao.js";

import Product from "./dao/models/productModel.js"

import __dirname from './utils.js';
import mongoose from "mongoose";


const app = express();
const port = 8080;
const server = http.createServer(app); //servidor HTTP

const mongoUrl= 'mongodb+srv://villegasmaxi:lola2508@cluster0.znvh4p2.mongodb.net/?retryWrites=true&w=majority'//mongoDB-connected Atlas
mongoose.connect(mongoUrl, {dbName: 'ecommerce'})
.then(()=>{
  console.log('DB mongo connected')
})
.catch(e =>{
  console.error('error connecting to DB mongo')
})


app.get("/mongo", (req, res) => {
  res.json({status:"OK"});
});

const io = new SocketIoServer(server);//websockets 
io.on("connection", (socket) => {
  console.log(" IO cliente conectado", socket.id );
  
    // Consulta los productos desde la base de datos y emite la lista actualizada

  socket.on("updateProducts", async () => {
    const products = await ProductDao.getProducts();
        socket.emit("productsUpdated", products);
      });

  // consulta al json local si funciona

  // socket.on("updateProducts", () => {
  //   const products = productManager.getProducts();
  //   socket.emit("productsUpdated", products); // Emite la lista de productos actualizada 
  // });


  socket.on("holaWebsocket", () => {
    console.log("hola desde server");
    socket.emit("holaConsola", { message: "hola desde server para el front" });
  });

  socket.on('createProduct', async(newProductData)=>{
    const productData = await ProductDao.addProduct(newProductData);
    console.log(productData);
  })
  
});


//app.use(express.static( process.cwd() + "/public"));
app.use(express.static( __dirname + "/public"));



//Define una variable global para compartir datos con las vistas

// app.use((req, res, next) => {
//   res.locals.products = productManager.getProducts();
//   next();
// });

//variable global a la bd mongoAtlas

app.use((req, res, next) => {
  res.locals.db = mongoose.connection;
  next();
});


//config handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", process.cwd() + "/views");
//app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.get("/index",(req,res)=>{
  res.render("index")
})

// Ruta para la vista home
app.get("/", (req, res) => {
  res.render("home");
});

// Ruta para la vista en tiempo real
app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

//ruta para el chat
app.get("/chat", (req, res) => {
  res.render("chat");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router);

server.listen(port, () => {
  console.log(`Servidor arriba en puerto ${port}`);
});
server;
