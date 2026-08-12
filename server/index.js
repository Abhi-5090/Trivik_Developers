import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import contactRoutes from './routes/contact.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api', contactRoutes)

async function start() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cityofpalms'
  try {
    await mongoose.connect(uri)
    console.log('✅ MongoDB connected')
  } catch (err) {
    // Don't hard-crash: the site still works; enquiries just won't persist until Mongo is up.
    console.error('⚠️  MongoDB connection failed:', err.message)
  }
  app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`))
}

start()
