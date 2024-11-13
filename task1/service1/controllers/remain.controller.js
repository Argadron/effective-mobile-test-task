import RemainService from '../services/remain.service.js'
import ShopService from '../services/shop.service.js'
import ProductService from '../services/product.service.js'
import { Router, request, response } from 'express'

const router = Router()

/**
* Validate PLU and quantity body
* @param {request} req 
* @param {response} res 
* @returns {Promise<Boolean>} True if validate success
*/
async function validator(req, res) {
    if (!req.body.plu) {
        res.status(400).json({ message: "PLU is required!" })

        return false
    }

    if (isNaN(parseInt(req.body.plu))) {
        res.status(400).json({ message: "PLU must be a number" })

        return false
    }

    if (req.body.quantity) {
        if (isNaN(parseInt(req.body.quantity))) {
            res.status(400).json({ message: "Quantity must be a number" })

            return false
        }
    }

    if (!(await RemainService.getByPlu(req.body.plu))) {
        res.status(404).json({ message: `Remain by PLU ${req.body.plu} not found!` })

        return false
    } 

    return true
}

class RemainController {
    /**
     * Create remain endpoint
     * @param {request} req 
     * @param {response} res 
     * @returns {object} - New remain
     */
    async create(req, res) {
        if (!req.body.shopId) return res.status(400).json({ message: "Shop id is required" })
        if (!req.body.plu) return res.status(400).json({ message: "PLU is required" })
        if (!req.body.type) return res.status(400).json({ message: "Type is required" })
        if (!req.body.quantity) return res.status(400).json({ message: "Quantity is required" })

        if (isNaN(parseInt(req.body.shopId))) return res.status(400).json({ message: "Shop id must be a number" })
        if (isNaN(parseInt(req.body.plu))) return res.status(400).json({ message: "PLU must be a number" })
        if (isNaN(parseInt(req.body.quantity))) return res.status(400).json({ message: "Quantity id must be a number" })

        if (req.body.type !== "order" && req.body.type !== "shelf") return res.status(400).json({ message: "Type must be a 'shelf' or 'order'!" })

        if (!(await ShopService.getById(req.body.shopId))) return res.status(404).json({ message: `Shop with id ${req.body.shopId} not found!` })
        if (!(await ProductService.getByPlu(req.body.plu))) return res.status(404).json({ message: `Product by plu ${req.body.plu} not found!` })
        if (await RemainService.getByPlu(req.body.plu)) return res.status(409).json({ message: `Remain by plu ${req.body.plu} already exsits!` })

        return res.json(await RemainService.create(req.body))
    }

    /**
     * Increment remain endpoint
     * @param {request} req 
     * @param {response} res 
     * @returns {object} A updated remain object
     */
    async increment(req, res) {
        if (!(await validator(req, res))) return;

        return res.json(await RemainService.increment(req.body))
    }

    /**
     * Decrement remain endpoint
     * @param {request} req 
     * @param {response} res 
     * @returns {object} A updated remain object
     */
    async decrement(req, res) {
        if (!(await validator(req, res))) return; 

        return res.json(await RemainService.decrement(req.body))
    }
}

const remain = new RemainController()

router.post(`/create`, remain.create)
router.put("/increment", remain.increment)
router.put(`/decrement`, remain.decrement)

export default router