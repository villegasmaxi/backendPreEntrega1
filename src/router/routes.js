import { Router } from "express";
import Carts from './routesCart.js'
import Products from './routesProducts.js'
import cartsMongo from './routesCartMongo.js'
import productsMongo from './routesProductMongo.js'

const router = Router();

router.use('/products', Products);
router.use('/carts', Carts);
router.use('/cartsMongo', cartsMongo);
router.use('/productsMongo', productsMongo);

router.use('/', (req, res) => {
    res.status(404).json({
      message: 'invalid api endpoint'
    })
})

export default router;