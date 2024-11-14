import { PrismaService } from '../prisma/prisma.service.js'
import axios from 'axios'

axios.defaults.baseURL = process.env.LOG_SERVER_URL ? `${process.env.LOG_SERVER_URL}/log/create` : `http://localhost:5000/log/create`
axios.defaults.headers = {
    "Content-Type": "Application/Json"
}

class ProductService extends PrismaService {
    constructor() {
        super()
    }

    /**
     * Create product method
     * @param {object} body 
     * @returns {Object} New product
     */
    async create(body) {
        const product = await this.prisma.product.create({
            data: {
               ...body
            }
        })

        await axios.post(`/`, {
            shopId: product.shopId,
            action: "PRODUCT_CREATED",
            plu: product.plu
        })

        return product
    }

    /**
     * Get products by filters method
     * @param {object} body  
     * @returns {object} - Product finded by name/plu or undefined
     */
    async getWithFilters(body) {
        const products = await this.prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: body.name } },
                    { plu: body.plu }
                ]
            }
        })

        if (products.length > 0) {
            const currentProduct = products[0]

            await axios.post(`/`, {
                shopId: currentProduct.shopId,
                action: "PRODUCT_GETTED",
                plu: currentProduct.plu
            })
        }

        return products
    }

    /**
     * Get product by PLU method
     * @param {number} plu - PLU product identificator 
     * @returns Product or undefined
     */
    async getByPlu(plu) {
        return await this.prisma.product.findUnique({
            where: {
                plu
            }
        })
    }
}

export default new ProductService()