import mongoose from 'mongoose'

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, trim: true, default: '' },
    termsconsent: { type: String, default: 'no' },
    source: { type: String, default: 'website' },
  },
  { timestamps: true }
)

export default mongoose.model('Enquiry', enquirySchema)
