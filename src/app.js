
// app.js
import express from 'express';
import productsRouter from './router/routes.js';
import cartsRouter from './router/routesCart.js';
import bodyParser from 'body-parser';


const app = express();
const PORT = 8080; 

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Servidor arriba en el puerto ${PORT}`);
});
