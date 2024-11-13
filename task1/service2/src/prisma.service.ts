import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

await client.$connect()

export class PrismaService {
    readonly prisma: PrismaClient

    constructor() {
        this.prisma = client
    }
}