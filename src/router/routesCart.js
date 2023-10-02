// routes-carts.js
import express from 'express';
import cartManager from '../carts.js';

const routerCart = express.Router();

// Crear un nuevo carrito
routerCart.post('/', (req, res) => {
  const { cid } = req.params;
  const newCart = cartManager.createCart(parseInt(cid));
  res.json(newCart);
});

// traer un carrito por ID
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
routerCart.post('/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const success = cartManager.addProductToCart(parseInt(cid), parseInt(pid), quantity);
  if (success) {
    res.json({ message: 'Producto agregado al carrito con éxito' });
  } else {
    res.status(404).json({ error: 'Carrito o producto no encontrado' });
  }
});




export default routerCart;
