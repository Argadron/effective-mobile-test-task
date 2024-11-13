import { Request, Router } from "express";
import { HistoryService } from "../services/history.service.js";

const router = Router()
const historyService = new HistoryService()

const LogTypes = ["PRODUCT_CREATED", "PRODUCT_GETTED", "REMAIN_CREATED", "REMAIN_INCREMENTED", "REMAIN_DECREMENTED"];
const DateFiltersTypes = ["AFTER", "BEFORE"];

class HistoryController {
    /**
     * Create history log endpoint
     */
    async create(req: Request, res: any) {
        if (!LogTypes.includes(req.body.action)) return res.status(400).json({ message: "Invalid log type" })

        if (!req.body.shopId) return res.status(400).json({ message: "Shop id is required" })
        if (!req.body.plu) return res.status(400).json({ message: "PLU is required" })
        if (!req.body.action) return res.status(400).json({ message: "Action is requried" })

        return res.json(await historyService.create(req.body))
    }

    async getWithFilters(req: Request, res: any) {
        if (req.query.dateSperator) {
            if (!DateFiltersTypes.includes(req.query.dateSperator as string)) return res.status(400).json({ message: "Date sperator must be a AFTER or BEFORE" })
        }
        if (req.query.action) {
            if (!LogTypes.includes(req.query.action as string)) return res.status(400).json({ message: "Invalid action type" })
        }

        for (let i in req.query) {
            const currentQuery = req.query[`${i}`]

            if (!isNaN(parseInt(currentQuery as string))) {
                req.query[`${i}`] = parseInt(currentQuery as string) as unknown as string
            }
        }

        return res.json(await historyService.getWithFilters(req.query))
    }
}

const history = new HistoryController()

router.post(`/create`, history.create)
router.get(`/search`, history.getWithFilters)

export default router