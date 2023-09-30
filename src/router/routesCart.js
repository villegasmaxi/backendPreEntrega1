// routes-carts.js
import express from 'express';
import cartManager from '../carts.js';

const routerCart = express.Router();

// Crear un nuevo carrito
routerCart.post('/', (req, res) => {
  const newCart = cartManager.createCart();
  res.json(newCart);
});

// Obtener un carrito por ID
routerCart.get('/:cid', (req, res) => {
  const { cid } = req.params;
  const cart = cartManager.getCartById(parseInt(cid));
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

// Agregar un producto a un carrito
// Implementa esta ruta similar a las rutas de productos

// Implementa más rutas para listar y eliminar productos del carrito si es necesario

export default routerCart;
