import fs from "fs";

class ProductManager {
    constructor() {
        //this.path = filePath;
        this.path = process.cwd()+ '/data/productos.json';
        this.products = [];
        this.nextId = 1;
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            if (Array.isArray(this.products)) {
                const maxId = this.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
                this.nextId = maxId + 1;
            }
        } catch (error) {
            console.log(error);
            this.products = [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
    }

    addProduct(productData) {
        const { title, description, price,code, stock,category,thumbnail } = productData;

        if (!title || !description || !price ||!code || !stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        if (this.products.some(product => product.code === code)) {
            console.error("El código de producto ya existe.");
            return;
        }

        const product = {
            id: this.nextId++,
            title,
            description,
            code,
            price,
            status:true,
            stock,
            category,
            thumbnail
        };

        this.products.push(product);
        this.saveProducts();
        console.log("Producto agregado:", product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.error("Producto no encontrado.");
        }
    }

    updateProduct(id, updatedData) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedData };
            this.saveProducts();
            console.log("Producto actualizado:", this.products[index]);
        } else {
            console.error("Producto no encontrado.");
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            const deletedProduct = this.products.splice(index, 1)[0];
            this.saveProducts();
            console.log("Producto eliminado:", deletedProduct);
        } else {
            console.error("Producto no encontrado.");
        }
    }
}

const productManager = new ProductManager();

export default productManager;
