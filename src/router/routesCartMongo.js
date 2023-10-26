import express from 'express';
import CartDao from '../dao/cartDao.js';

const routerCartMongo = express.Router();
const cartDao = new CartDao(); // Crear una instancia de CartDao

// Crear un nuevo carrito
routerCartMongo.post('/', async (req, res) => {
  const { userId } = req.body;
  try {
    const newCart = await cartDao.createCart(userId);
    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

// Traer un carrito por ID
routerCartMongo.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartDao.getCartById(cid);
    res.json(cart);
  } catch (error) {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

// Agregar un producto a un carrito
routerCartMongo.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    await cartDao.addProductToCart(cid, pid, quantity);
    res.json({ message: 'Producto agregado al carrito con éxito' });
  } catch (error) {
    res.status(404).json({ error: 'Carrito o producto no encontrado' });
  }
});

export default routerCartMongo;
