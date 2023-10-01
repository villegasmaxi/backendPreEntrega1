import { Router } from "express";
import Carts from './routesCart.js'
import Products from './routesProducts.js'

const router = Router();

router.use('/products', Products);
router.use('/carts', Carts);

router.use('/', (req, res) => {
    res.status(404).json({
      message: 'invalid api endpoint'
    })
})

export default router;