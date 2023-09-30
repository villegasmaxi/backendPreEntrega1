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

  addProductToCart(cartId, productId, quantity) {
    const cart = this.getCartById(cartId);
    const product = productManager.getProductById(productId);

    if (!cart || !product) {
      return false; // Error: Carrito o producto no encontrado
    }

    // Verifica si el producto ya está en el carrito
    const existingProduct = cart.products.find((item) => item.product.id === productId);
    if (existingProduct) {
      // Si el producto ya existe, incrementa la cantidad
      existingProduct.quantity += quantity;
    } else {
      // Si el producto no existe en el carrito, agrégalo
      cart.products.push({ product, quantity });
    }
   }
  

  // para listar productos de un carrito.
  getProductsInCart(cartId) {
    const cart = this.getCartById(cartId);
    return cart ? cart.products : [];
  }

  //eliminar productos de un carrito.
  removeProductFromCart(cartId, productId) {
    const cart = this.getCartById(cartId);

    if (!cart) {
      return false; // Error: Carrito no encontrado
    }

    const index = cart.products.findIndex((item) => item.product.id === productId);

    if (index !== -1) {
      // Elimina el producto del carrito
      cart.products.splice(index, 1);
      this.saveCarts();
      return true;
    }

    return false; // Error: Producto no encontrado en el carrito
  }
}

const cartManager = new CartManager();

export default cartManager;
