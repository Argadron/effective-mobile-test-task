import { PrismaService } from "../prisma/prisma.service.js";

class ShopService extends PrismaService {
    constructor() {
        super()
    }

    /**
     * Create shop method
     * @param {string} name - Shop name
     * @returns Object with shopId and shopName
     */
    async create(name) {
        return await this.prisma.shop.create({
            data: {
                shopName: name
            }
        })
    }

    /**
     * List all shops method
     * @returns Object with all shops
     */
    async list() {
        return await this.prisma.shop.findMany()
    }

    /**
     * Get shop by id method
     * @param {number} id - Shop id
     * @returns Return shop instance or undefined
     */
    async getById(id) {
        return await this.prisma.shop.findUnique({
            where: {
                shopId: id
            }
        })
    }
}

export default new ShopService()