import { Router } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import nodemailer from 'nodemailer'
import Enquiry from '../models/Enquiry.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const router = Router()

// Build a mail transport only if SMTP is configured; otherwise emails are skipped.
function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

// POST /api/contact — store enquiry + notify by email
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message = '', termsconsent = 'no', source = 'website' } = req.body || {}
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email and contact number are required.' })
    }

    const enquiry = await Enquiry.create({ name, email, phone, message, termsconsent, source })

    // fire-and-forget email notification (never blocks the response on failure)
    const transport = getTransport()
    if (transport) {
      transport
        .sendMail({
          from: process.env.MAIL_FROM || process.env.SMTP_USER,
          to: process.env.MAIL_TO || process.env.SMTP_USER,
          subject: `New enquiry — City of Palms (${source})`,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nQuery: ${message}\nConsent: ${termsconsent}`,
        })
        .catch((err) => console.error('Email send failed:', err.message))
    }

    return res.status(201).json({ message: 'Enquiry received', id: enquiry._id })
  } catch (err) {
    console.error('Contact error:', err)
    return res.status(500).json({ message: 'Something went wrong. Please try again.' })
  }
})

// GET /api/brochure — serve the e-brochure PDF
router.get('/brochure', (req, res) => {
  const pdfPath = path.join(__dirname, '..', 'assets', 'City-Of-Palms-E-Brochure.pdf')
  if (!fs.existsSync(pdfPath)) {
    return res.status(404).json({ message: 'Brochure not available.' })
  }
  res.download(pdfPath, 'IVC - City of Palms.pdf')
})

export default router
