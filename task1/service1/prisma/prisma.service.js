import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

await client.$connect()

export class PrismaService {
    constructor() {
        this.prisma = client
    }
}