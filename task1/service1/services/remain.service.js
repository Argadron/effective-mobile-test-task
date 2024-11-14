import { RemainType } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service.js";
import axios from 'axios'

axios.defaults.baseURL = 
axios.defaults.baseURL = process.env.LOG_SERVER_URL ? `${process.env.LOG_SERVER_URL}/log/create` : `http://localhost:5000/log/create`
axios.defaults.headers = {
    "Content-Type": "Application/Json"
}

class RemainService extends PrismaService {
    constructor() {
        super()
    }

    /**
     * Create remain method
     * @param {object} body 
     * @returns {object} - New remain instance
     */
    async create(body) {
        const remain = await this.prisma.remains.create({
            data: {
                ...body,
                type: body.type === "order" ? RemainType.ORDER : RemainType.SHELF
            }
        })

        await axios.post(`/`, {
            plu: remain.plu,
            shopId: remain.shopId,
            action: "REMAIN_CREATED"
        })

        return remain
    }

    /**
     * Get remain by PLU method
     * @param {number} plu - PLU product identificator 
     * @returns Remain object / undefined
     */
    async getByPlu(plu) {
        return await this.prisma.remains.findUnique({
            where: {
                plu
            }
        })
    }

    /**
     * Increment remain by PLU method
     * @param {object} body 
     * @returns {object} A updated remain
     */
    async increment(body) {
        const updatedRemain = await this.prisma.remains.update({
            where: {
                plu: body.plu
            }, 
            data: {
                quantity: body.quantity ? { increment: body.quantity } : { increment: 1 }
            }
        })

        await axios.post(`/`, {
            plu: updatedRemain.plu,
            shopId: updatedRemain.shopId,
            action: "REMAIN_INCREMENTED"
        })

        return updatedRemain
    }

    /**
     * Decrement remain method
     * @param {object} body 
     * @returns {object} A updated remain
     */
    async decrement(body) {
        const updatedRemain = await this.prisma.remains.update({
            where: {
                plu: body.plu
            },
            data: {
                quantity: body.quantity ? { decrement: body.quantity } : { decrement: 1 }
            }
        })

        await axios.post(`/`, {
            plu: updatedRemain.plu,
            shopId: updatedRemain.shopId,
            action: "REMAIN_DECREMENTED"
        })

        return updatedRemain
    }
}

export default new RemainService()