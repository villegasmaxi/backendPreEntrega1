
// app.js
import express from 'express';
import productsRouter from './router/routes.js';
import cartsRouter from './router/routesCart.js'; // Importa el enrutador de carritos
import bodyParser from 'body-parser';
import routerCart from './router/routesCart.js';

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter); // Usa el enrutador de carritos en la ruta /api/carts

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
