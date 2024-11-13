import express from 'express'
import 'dotenv/config'
import swaggerUi from 'swagger-ui-express'
import shop from './controllers/shop.controller.js'
import products from './controllers/product.controller.js'
import remain from './controllers/remain.controller.js'
import { output } from './swagger/swagger.js'

const app = express()

const PORT = +process.env.PORT ?? 3000
const HOST = process.env.HOST ?? "localhost"

app.use(express.json())
app.use(`/shop`, shop)
app.use(`/products`, products)
app.use(`/remain`, remain)

app.use(`/api`, swaggerUi.serve, swaggerUi.setup(output))

app.use(`*`, (_, res) => {
   return res.status(404).json({ message: "Route not found" })
})

app.listen(PORT, HOST, (error) => {
    if (error) console.error(error)

    console.log(`Server started on http://${HOST}:${PORT}`)
})