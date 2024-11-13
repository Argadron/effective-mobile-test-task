import { Router, request, response } from 'express'
import ProductService from '../services/product.service.js'
import ShopService from '../services/shop.service.js'

const router = Router()

class ProductController {
    /**
     * Create product endpoint
     * @param {request} req 
     * @param {response} res 
     * @returns Product instance
     */
    async create(req, res) {
        if (!req.body.quantity) return res.status(400).json({ message: "Quantity is required!" })
        if (!req.body.name) return res.status(400).json({ message: "Name is required!" })
        if (!req.body.shopId) return res.status(400).json({ message: "Shop id is required!" })

        if (isNaN(parseInt(req.body.quantity))) return res.status(400).json({ message: "Quantity must be a number!" })
        if (isNaN(parseInt(req.body.shopId))) return res.status(400).json({ message: "Shop id must be a number!" })

        if (!(await ShopService.getById(req.body.shopId))) return res.status(404).json({ message: `Shop with id ${req.body.shopId} not found!` })

        return res.json(await ProductService.create(req.body))
    }

    /**
     * Get products by filters endpoint
     * @param {request} req 
     * @param {response} res 
     * @returns Product or undefined
     */
    async getWithFilters(req, res) {
        if (!req.query.name && !req.query.plu) return res.status(400).json({ message: "PLU or product name must be writed!" })

        if (isNaN(parseInt(req.query.plu)) && req.query.plu) return res.status(400).json({ message: "PLU must be a numberic string" })

        if (req.query.plu) req.query.plu = parseInt(req.query.plu)
 
        return res.json(await ProductService.getWithFilters(req.query))
    }
}

const products = new ProductController()

router.post("/create", products.create)
router.get(`/search`, products.getWithFilters)

export default router