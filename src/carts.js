// carts.js
import fs from 'fs';
import productManager from "./products.js";

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
    const maxId = this.carts.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);
    const cart = {
      id: maxId + 1,
      products: [],
    };
    this.carts.push(cart);
    this.saveCarts();
    return cart;
  }

  getCartById(id) {
    return this.carts.find((cart) => cart.id === id);
  }

  addProductToCart(cartId, productId, quantity) {
    const cart = this.getCartById(cartId);
    const product = productManager.getProductById(productId);

    if (!cart || !product) {
      return false; // Error: Carrito o producto no encontrado
    }

    // Verifica si el producto ya está en el carrito
    const existingProduct = cart.products.find((item) => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity += 1;
      this.saveCarts();
      return true
    } else {
      // Si no existe lo agrego
      cart.products.push({ id: product.id, quantity: 1 });
      this.saveCarts();
      return true
    }
   }
  

  
}

const cartManager = new CartManager();

export default cartManager;
