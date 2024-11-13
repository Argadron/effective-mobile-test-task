import express, { Request } from 'express'
import 'dotenv/config'
import swaggerUi from 'swagger-ui-express'
import { output } from './swagger/swagger.js'
import history from './controllers/history.controller.js'

const app = express()

const PORT = +process.env.PORT || 3000
const HOST = process.env.HOST || "localhost"

app.use(express.json())
app.use(`/log`, history)

app.use(`/api`, swaggerUi.serve, swaggerUi.setup(output))

app.use(`*`, (req: Request, res: any) => {
    return res.status(404).json({ message: "Route not found" })
})

app.listen(PORT, HOST, () => {
    console.log(`Server started on http://${HOST}:${PORT}`)
})