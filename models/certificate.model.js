const mongoose = require('mongoose')

const certificateSchema = new mongoose.Schema({
 name: {
  type: String,
  required: true,
 },
 image: {
  type: String,
  required: true,
 },
 description: {
  type: String,
  required: true,
 },
 price: {
  type: Number,
  required: true,
 },
 company: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Company',
  required: true,
 },
 test_taken_by: {
  type: Number,
  default: 0,
 },
 test_passed_by: {
  type: Number,
  default: 0,
 },
 overall_difficulty: {
  type: String,
  enum: ['Easy', 'Medium', 'Hard'],
  required: true,
 },
 num_questions: {
  type: Number,
  required: true,
 },
 certificate_image: {
  type: String,
  default: "https://res.cloudinary.com/dcew0uqhb/image/upload/v1675523956/Arcade/appleLogo_ffdya1.png"
 },
}
 , { timestamps: true })

module.exports = mongoose.model('Certificate', certificateSchema)