// app.js
import express from "express";
import handlebars from "express-handlebars";
import http from "http";
import { Server as SocketIoServer } from "socket.io"; // Importa Server con alias

import router from "./router/routes.js";
import bodyParser from "body-parser";

import productManager from "./products.js";

const app = express();
const port = 8080;

const server = http.createServer(app); //servidor HTTP

const io = new SocketIoServer(server);

io.on("connection", (socket) => {
  console.log(" Un cliente conectado");

  // Ejemplo de emisión de productos actualizados
  socket.on("updateProducts", () => {
    const products = productManager.getProducts();
    socket.emit("productsUpdated", products); // Emite la lista actualizada a todos los clientes
  });

  socket.on("holaWebsocket", () => {
    console.log("hola desde server");
    socket.emit("holaConsola", { message: "hola desde server" });
  });
});

app.use(express.static( process.cwd() + "/public"));

//config handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", process.cwd() + "/views");
app.set("view engine", "handlebars");


// Ruta para la vista home
app.get("/", (req, res) => {
  res.render("home");
});

// Ruta para la vista en tiempo real
app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router);

server.listen(port, () => {
  console.log(`Servidor arriba en puerto ${port}`);
});

server;
