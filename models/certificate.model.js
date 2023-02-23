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
 syllabus_topics: {
  type: [String],
  required: true,
 }
}
 , { timestamps: true })

module.exports = mongoose.model('Certificate', certificateSchema)