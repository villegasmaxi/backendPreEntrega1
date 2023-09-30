// carts.js
import fs from 'fs';

class CartManager {
  constructor() {
    this.path = process.cwd() + '/data/carrito.json';
    this.carts = [];
    this.nextId = 1;
    this.loadCarts();
  }

  loadCarts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.carts = JSON.parse(data);
      if (!Array.isArray(this.carts)) {
        this.carts = [];
      }
    } catch (error) {
      console.log(error);
      this.carts = [];
    }
  }

  saveCarts() {
    fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2), 'utf8');
  }

  createCart() {
    const cart = {
      id: this.nextId++,
      products: [],
    };
    this.carts.push(cart);
    this.saveCarts();
    return cart;
  }

  getCartById(id) {
    return this.carts.find((cart) => cart.id === id);
  }

  // Implementa métodos para agregar, listar y eliminar productos de un carrito.
}

const cartManager = new CartManager();

export default cartManager;
