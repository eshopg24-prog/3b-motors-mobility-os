import express from 'express'
import rateLimit from 'express-rate-limit'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const port = Number(process.env.PORT) || 3000

const fallbackLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 120,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
})

app.use(express.static(path.join(__dirname, 'dist')))
app.use(fallbackLimiter, (_, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`3B Motors platform server running on port ${port}`)
})
