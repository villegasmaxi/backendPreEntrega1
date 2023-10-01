// routes.js
import express from 'express';
import productManager from '../products.js';

const router = express.Router();

// Listar todos los productos
router.get('/', (req, res) => {
  const products = productManager.getProducts();
  res.json(products);
});

// Obtener un producto por ID
router.get('/:pid', (req, res) => {
  const { pid } = req.params;
  const product = productManager.getProductById(parseInt(pid));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Agregar un nuevo producto
router.post('/', (req, res) => {
  const productData = req.body;
  productManager.addProduct(productData);
  res.json({ message: 'Producto agregado con éxito' });
});

// Actualizar un producto por ID
router.put('/:pid', (req, res) => {
  const { pid } = req.params;
  const updatedData = req.body;
  productManager.updateProduct(parseInt(pid), updatedData);
  res.json({ message: 'Producto actualizado con éxito' });
});

// Eliminar un producto por ID
router.delete('/:pid', (req, res) => {
  const { pid } = req.params;
  productManager.deleteProduct(parseInt(pid));
  res.json({ message: 'Producto eliminado con éxito' });
});

export default router;