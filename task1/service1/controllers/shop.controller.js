import ShopService from "../services/shop.service.js";
import { Router, response, request } from "express";

const router = Router()

class ShopController {
    /**
     * Create shop endpoint
     * @param {request} req 
     * @param {response} res 
     * @returns 
     */
    async create(req, res) {
        if (!req.body.name) return res.status(400).json({ message: "Name is required!" })

        return res.json(await ShopService.create(req.body.name))
    }

    /**
     * List all shops endpoint
     * @param {request} req 
     * @param {response} res 
     */
    async list(req, res) {
        return res.json(await ShopService.list())
    }
}

const shop = new ShopController()

router.post("/create", shop.create)
router.get("/list", shop.list)

export default router