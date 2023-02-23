const mongoose = require('mongoose')

const scriptSchema = new mongoose.Schema({
 certificate: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Certificate',
  required: true,
 },
 questions: {
  type: [String],
  required: true,
 },
 answers: {
  type: [String],
  required: true,
 },
 correct_answers: {
  type: [String],
  required: true,
 },
}, { timestamps: true })

module.exports = mongoose.model('Script', scriptSchema)