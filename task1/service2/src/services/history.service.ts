import { PrismaService } from "../prisma.service.js";
import { HistoryCreateDto, LogTypes } from "./history.create.dto.js";

export type Filters = {
    shopId?: number;
    plu?: number;
    date?: Date; 
    dateSperator?: "before" | "after";
    action?: keyof typeof LogTypes
    limit?: number;
    page?: number
}

export class HistoryService extends PrismaService {
    constructor() {
        super()
    }

    async create(dto: HistoryCreateDto) {
        return await this.prisma.history.create({
            data: {
                ...dto
            }
        })
    }

    async getWithFilters(filters: Filters) {
        if (Object.keys(filters).length === 0) return await this.prisma.history.findMany()

        return await this.prisma.history.findMany({
            where: {
                OR: [
                    { plu: filters.plu },
                    { shopId: filters.shopId },
                    { action: filters.action },
                    { createdAt: filters.dateSperator === "before" ? { lte: filters.date } : { gte: filters.date } }
                ]
            },
            take: filters.limit ? filters.limit : 50,
            skip: filters.page ? (filters.page - 1) * filters.limit : 0
        })
    }
}